import { Locator, Page } from "@playwright/test";

export class MyAccountHomePage {

    readonly searchInput: Locator
    readonly searchButton: Locator

    readonly page: Page
    constructor(page: Page) {

        this.page = page
        this.searchInput = page.getByPlaceholder('Search')
        this.searchButton = page.locator('[class*="search"]')

    }

    async enterSearchInput(searchItem: string) {
        await this.searchInput.fill(searchItem)
    }

    async clickOnSeachButton() {
        await this.searchButton.click()
    }

    async performSearch(searchItem : string ) {

        await this.enterSearchInput(searchItem)
        await this.clickOnSeachButton()
    }
}