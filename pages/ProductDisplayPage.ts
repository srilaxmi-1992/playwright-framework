
import { Locator, Page, expect } from "@playwright/test";

export class ProductDisplayPage {

    readonly page: Page
    readonly productNameHeading: Locator
    readonly productBrand: Locator
    readonly productCode: Locator
    readonly productAvailability: Locator
    readonly productQuantityInput: Locator
    readonly compareButton: Locator
    readonly compareSuccessMessage: Locator
    readonly addToCartButton: Locator
    readonly shoppingCartLink: Locator

    constructor(page: Page) {

        this.page = page
        this.productNameHeading = page.getByRole('heading', { level: 1 })
        this.productBrand = page.getByRole('listitem').filter({ hasText: /Brand:/ })
        this.productCode = page.getByRole('listitem').filter({ hasText: /Product Code:/ })
        this.productAvailability = page.getByRole('listitem').filter({ hasText: /Availability:/ })
        this.productQuantityInput = page.getByRole('textbox', { name: 'Qty' })
        this.compareButton = page.locator('div.col-sm-4 [data-original-title="Compare this Product"]')
        this.compareSuccessMessage = page.locator('div.alert-success')
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart', exact : true })
        this.shoppingCartLink = page.getByRole('link', { name: 'shopping cart', exact : true })

    }


    async addToCart() {
        await this.addToCartButton.click()
    }

    async validateProductHeading(productName: string) {
        await expect(this.productNameHeading).toHaveText(productName)
    }

    async validateProductBrand(productBrand: string) {
        await expect(this.productBrand.locator('a')).toHaveText(productBrand)
    }

    async validateProductCode(productCode: string) {
        await expect(this.productCode).toContainText(productCode)
    }

    async validateProductAvailability(productAvailability: string) {
        await expect(this.productAvailability).toContainText(productAvailability)
    }

    async validateDefaultQuantity(productQuantity: string) {
        await expect(this.productQuantityInput).toHaveAttribute('value', productQuantity)
    }

    async clickOnCompareButtonRelatedProducts() {
        await this.compareButton.click()
    }

    async validateSuccessMessage(productName: string, successMessage: string) {
        successMessage = successMessage.replace("#product_name", productName)
        await expect(this.compareSuccessMessage).toContainText(successMessage)
    }

    async clickOnShoppingCartLink() {
        await this.shoppingCartLink.click()
    }


}