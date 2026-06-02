import { expect, Locator, Page } from "@playwright/test";

export class SearchPage {

    readonly productGrid: Locator
    readonly noProductText: Locator
    readonly searchCriteriaInput: Locator
    readonly searchButton: Locator
    readonly searchWithDescCheckbox: Locator
    readonly categoryDropdown: Locator
    readonly page: Page
    constructor(page: Page) {

        this.page = page
        this.productGrid = page.locator('.product-grid')
        this.searchCriteriaInput = page.getByPlaceholder('Keywords')
        this.searchButton = page.getByRole('button', { name: 'Search', exact: true })
        this.noProductText = page.getByText('There is no product that matches the search criteria.')
        this.searchWithDescCheckbox = page.getByRole('checkbox', { name: /product descriptions/ })
        this.categoryDropdown = page.locator('[name="category_id"]')
    }

    async selectCategoryUsingValue(category: string) {
        await this.categoryDropdown.selectOption({ value: category })
    }

    async enterSearchInCriteria(searchItem: string) {
        await this.searchCriteriaInput.fill(searchItem)
    }

    async clickSearchButton() {
        await this.searchButton.click()
    }

    async checkSearchDescription() {
        await this.searchWithDescCheckbox.check()
    }

    async searchUsingSearchCriteria(searchItem: string) {
        await this.enterSearchInCriteria(searchItem)
        await this.clickSearchButton()
    }
    async searchUsingSearchCriteriaWithDesc(searchItem: string) {
        await this.enterSearchInCriteria(searchItem)
        await this.checkSearchDescription()
        await this.clickSearchButton()
    }
    async isLoaded(): Promise<void> {

        await expect(this.page).toHaveTitle(/Search/)
        await expect(this.page).toHaveURL(/search/)
    }

    async validateSearchItemIsVisible(name: string): Promise<void> {
        await expect(this.productGrid.filter({
            has: this.page.getByRole('link', { name: name, exact: true })
        })).toBeVisible()
    }

    async validateNoResultsFound(): Promise<void> {
        await expect(this.noProductText).toBeVisible()
    }

    async countOfSearchresults(): Promise<number> {
        return await this.productGrid.count()
    }

    async validateMultipleSearchItemAreVisible(): Promise<void> {
        const count = await this.productGrid.count()
        for (let i = 0; i < count; i++) {
            await expect(this.productGrid.nth(i)).toBeVisible()
        }
    }

    async searchUsingCategory(searchItem: string, category: string) {
        await this.enterSearchInCriteria(searchItem)
        await this.selectCategoryUsingValue(category)
        await this.clickSearchButton()
    }

    async searchUsingCategoryWithDesc(searchItem: string, category: string) {
        await this.enterSearchInCriteria(searchItem)
        await this.selectCategoryUsingValue(category)
        await this.checkSearchDescription()
        await this.clickSearchButton()
    }

    async clickOnProduct(productName: string) {

        await expect(this.productGrid.filter({
            has: this.page.getByRole('link', { name: productName, exact: true })
        })).toBeVisible()
        await this.productGrid.filter({
            has: this.page.getByRole('link', { name: productName, exact: true })
        }).locator(`img[title=${productName}]`).click()

    }
}