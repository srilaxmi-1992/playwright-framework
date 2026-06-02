
import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {

    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly page: Page
    constructor(page: Page) {

        this.page = page
        this.emailInput = page.getByPlaceholder('E-Mail Address')
        this.passwordInput = page.getByPlaceholder('Password')
        this.loginButton = page.locator('input[type="submit"][value="Login"]')

    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email)
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password)
    }

    async login() {
        await this.loginButton.click()
    }

    async performLogin(email: string, password: string) {

        await this.enterEmail(email)
        await this.enterPassword(password)
        await this.login()

    }

    async isLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/account/)
        await expect(this.page).toHaveTitle('My Account')
    }
}