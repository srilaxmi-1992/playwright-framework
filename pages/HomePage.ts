import { Locator, Page } from "@playwright/test";

export class HomePage {

    readonly myAccountLink: Locator
    readonly loginLink: Locator
    readonly page: Page
    constructor(page: Page) {

        this.page = page
        this.myAccountLink = page.locator('span:has-text("My Account")')
        this.loginLink = page.locator('a:has-text("Login")')

    }

    async clickMyAccountLink() {
        await this.myAccountLink.click()
    }

    async clickLoginLink() {
        await this.clickMyAccountLink()
        await this.loginLink.click()
    }

}