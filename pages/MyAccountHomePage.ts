import { Locator, Page } from "@playwright/test";

export class MyAccountHomePage {

    readonly searchInput: Locator
    readonly searchButton: Locator
    readonly shoppingCartLink: Locator
    readonly myAccountText: Locator
    readonly myAccountLink: Locator
    readonly logoutLink: Locator
    readonly checkoutLink: Locator

    readonly page: Page

    constructor(page: Page) {

        this.page = page
        this.searchInput = page.getByPlaceholder('Search')
        this.searchButton = page.locator('[class*="search"]')
        this.shoppingCartLink = page.getByTitle('Shopping Cart')
        this.myAccountText = page.locator('span:has-text("My Account")')
        this.myAccountLink = page.getByTitle('My Account', { exact: true })
        this.logoutLink = page.getByRole('link', { name: 'Logout' })
        this.checkoutLink = page.getByTitle('Checkout', { exact: true })

    }

    async clickOnCheckoutLink() {
        await this.checkoutLink.click()
    }

    async navigateToMyAccountHomePage() {
        await this.clickMyAccountText()
        await this.clickMyAccountLink()
    }

    async logout() {
        await this.clickMyAccountText()
        await this.clickonLogout()
    }
    async clickMyAccountLink() {
        await this.myAccountLink.click()
    }

    async clickonLogout() {
        await this.logoutLink.click()
    }
    async clickMyAccountText() {
        await this.page.waitForLoadState('networkidle')
        await this.myAccountText.click()
    }

    async clickOnShoppingCart() {

        await this.shoppingCartLink.click()
    }

    async enterSearchInput(searchItem: string) {
        await this.searchInput.fill(searchItem)
    }

    async clickOnSeachButton() {
        await this.searchButton.click()
    }

    async performSearch(searchItem: string) {

        await this.enterSearchInput(searchItem)
        await this.clickOnSeachButton()
    }
}