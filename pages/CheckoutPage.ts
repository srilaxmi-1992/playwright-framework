import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {

readonly page : Page
    constructor(page : Page) {
this.page = page
    }

   async isCheckoutPageLoaded() {

        await expect(this.page).toHaveURL(/checkout/)
        await expect(this.page).toHaveTitle(/Checkout/)
    }
}