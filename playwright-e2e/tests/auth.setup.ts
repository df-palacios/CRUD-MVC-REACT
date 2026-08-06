import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('iniciar sesión y guardar la sesión', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        process.env.ADMIN_USER || 'admin',
        process.env.ADMIN_PASSWORD || 'admin123'
    );

    // confirma que el login funcionó antes de guardar la sesión
    await expect(page.getByTestId('tabla-contactos')).toBeVisible();

    await page.context().storageState({ path: authFile });
});
