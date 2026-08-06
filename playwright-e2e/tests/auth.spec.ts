import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Autenticación', () => {

    // estos tests necesitan arrancar SIN sesión, así que ignoramos
    // el storageState que comparten los tests del CRUD
    test.use({ storageState: { cookies: [], origins: [] } });

    test('sin sesión, entrar a "/" redirige a /login', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL(/\/login/);
    });

    test('login exitoso muestra la tabla de contactos', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();

        await loginPage.login(
            process.env.ADMIN_USER || 'admin',
            process.env.ADMIN_PASSWORD || 'admin123'
        );

        await expect(page).toHaveURL('/');
        await expect(page.getByTestId('tabla-contactos')).toBeVisible();
        await expect(page.getByTestId('navbar-usuario')).toBeVisible();
    });

    test('login con password incorrecto muestra error y no navega', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();

        await loginPage.login(process.env.ADMIN_USER || 'admin', 'password-incorrecta');

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(page).toHaveURL(/\/login/);
    });

    test('logout limpia la sesión y vuelve a bloquear la ruta protegida', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();

        await loginPage.login(
            process.env.ADMIN_USER || 'admin',
            process.env.ADMIN_PASSWORD || 'admin123'
        );
        await expect(page.getByTestId('tabla-contactos')).toBeVisible();

        await page.getByTestId('btn-logout').click();
        await expect(page).toHaveURL(/\/login/);

        // aunque intente volver a "/", debe rebotar a /login otra vez
        await page.goto('/');
        await expect(page).toHaveURL(/\/login/);
    });
});
