import { Page, Locator } from '@playwright/test';

export interface Contacto {
    nombres: string;
    apellidos: string;
    correo: string;
    telefonos: number;
    celular: number;
    direccion: string;
    ciudad: string;
}

export class ContactosPage {

    readonly page: Page;
    readonly formulario: Locator;
    readonly tabla: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formulario = page.getByTestId('form-contacto');
        this.tabla = page.getByTestId('tabla-contactos');
    }

    async goto() {
        await this.page.goto('/');
    }

    /** Llena el formulario compartido sin enviarlo todavía. */
    async llenarFormulario(contacto: Contacto) {
        await this.page.getByTestId('input-nombres').fill(contacto.nombres);
        await this.page.getByTestId('input-apellidos').fill(contacto.apellidos);
        await this.page.getByTestId('input-correo').fill(contacto.correo);
        await this.page.getByTestId('input-telefonos').fill(String(contacto.telefonos));
        await this.page.getByTestId('input-celular').fill(String(contacto.celular));
        await this.page.getByTestId('input-direccion').fill(contacto.direccion);
        await this.page.getByTestId('input-ciudad').fill(contacto.ciudad);
    }

    /** Fila de la tabla que contiene ese correo (el correo es el dato más único que tenemos). */
    filaPorCorreo(correo: string): Locator {
        return this.tabla.locator('tr', { hasText: correo });
    }

    async crearContacto(contacto: Contacto) {
        await this.llenarFormulario(contacto);
        await this.page.getByTestId('btn-enviar').click();
    }

    /**
     * Flujo nuevo: se toca "Editar" en la fila (eso carga el contacto en el
     * formulario), se sobreescriben los campos, y se confirma con
     * "Guardar cambios".
     */
    async editarContacto(correoActual: string, datosNuevos: Contacto) {
        const fila = this.filaPorCorreo(correoActual);
        await fila.getByRole('button', { name: 'Editar' }).click();

        await this.llenarFormulario(datosNuevos);
        await this.page.getByTestId('btn-enviar').click();
    }

    async borrarContacto(correo: string) {
        const fila = this.filaPorCorreo(correo);
        await fila.getByRole('button', { name: 'Borrar' }).click();
    }
}
