import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly usuarioInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usuarioInput = page.getByTestId('login-usuario');
        this.passwordInput = page.getByTestId('login-password');
        this.submitButton = page.getByTestId('login-submit');
        this.errorMessage = page.getByTestId('login-error');
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(usuario: string, password: string) {
        await this.usuarioInput.fill(usuario);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}
