import { Locator, Page, expect } from "@playwright/test";

export class ShoppingCartPage {

    readonly page: Page
    readonly addToCartButton: Locator
    readonly removeCartButton: Locator
    readonly emptyShoppingCart: Locator
    readonly shoppingCartDiv: Locator


    constructor(page: Page) {

        this.page = page
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' , exact : true})
        this.removeCartButton = page.locator('button[data-original-title="Remove"]')
        this.shoppingCartDiv = page.locator('div#content')
        this.emptyShoppingCart = this.shoppingCartDiv.getByText('Your shopping cart is empty!')
    }

    async addItemToCart() {
        await this.addToCartButton.click()
    }

    async removeItemFromCart() {
        if (!await this.emptyShoppingCart.isVisible())
            await this.removeCartButton.click()

        await expect(this.emptyShoppingCart).toBeVisible()
    }

    async isShoppingCartLoaded() {
        await expect(this.page).toHaveURL(/cart/)
        await expect(this.page).toHaveTitle(/Shopping Cart/)
    }

    async validateEmptyShoppingCart() {

        await expect(this.emptyShoppingCart).toHaveText('Your shopping cart is empty!')
    }
}