import { test, expect } from '@playwright/test';
import { ContactosPage, Contacto } from '../pages/ContactosPage';

test.describe('CRUD de contactos', () => {

    test('crear un contacto y verlo en la tabla', async ({ page }) => {

        const contactos = new ContactosPage(page);
        await contactos.goto();

        const correo = `playwright.${Date.now()}@test.com`;

        const nuevo: Contacto = {
            nombres: 'Playwright',
            apellidos: 'Test',
            correo,
            telefonos: 6041234567,
            celular: 3001234567,
            direccion: 'Calle Automatizada # 1-23',
            ciudad: 'Cali'
        };

        await contactos.crearContacto(nuevo);

        await expect(contactos.filaPorCorreo(correo)).toBeVisible();
    });

    test('editar un contacto existente', async ({ page }) => {

        const contactos = new ContactosPage(page);
        await contactos.goto();

        const correoOriginal = `playwright.edit.${Date.now()}@test.com`;

        await contactos.crearContacto({
            nombres: 'Editar',
            apellidos: 'Antes',
            correo: correoOriginal,
            telefonos: 6041111111,
            celular: 3001111111,
            direccion: 'Calle Original',
            ciudad: 'Cali'
        });
        await expect(contactos.filaPorCorreo(correoOriginal)).toBeVisible();

        const correoNuevo = `playwright.edit.despues.${Date.now()}@test.com`;

        await contactos.editarContacto(correoOriginal, {
            nombres: 'Editar',
            apellidos: 'Despues',
            correo: correoNuevo,
            telefonos: 6042222222,
            celular: 3002222222,
            direccion: 'Calle Editada',
            ciudad: 'Bogota'
        });

        await expect(contactos.filaPorCorreo(correoNuevo)).toBeVisible();
        await expect(contactos.filaPorCorreo(correoOriginal)).toHaveCount(0);
    });

    test('borrar un contacto', async ({ page }) => {

        const contactos = new ContactosPage(page);
        await contactos.goto();

        const correo = `playwright.delete.${Date.now()}@test.com`;

        await contactos.crearContacto({
            nombres: 'Borrar',
            apellidos: 'Test',
            correo,
            telefonos: 6043333333,
            celular: 3003333333,
            direccion: 'Calle a Borrar',
            ciudad: 'Cali'
        });
        await expect(contactos.filaPorCorreo(correo)).toBeVisible();

        await contactos.borrarContacto(correo);

        await expect(contactos.filaPorCorreo(correo)).toHaveCount(0);
    });
});
