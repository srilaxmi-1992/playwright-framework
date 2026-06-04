import { test } from '../fixtures/pageFixtures';
import { config } from "../config/config";
import { JSONUtils } from "../utils/JSONUtils";



test.beforeEach('Test setup', async ({ homePage, loginPage, myAccountHomePage, shoppingCartPage }) => {

    // Perform Login
    await homePage.clickLoginLink()
    await loginPage.performLogin(config.email, config.password)
    await loginPage.isLoaded()

    // clean Cart
    await myAccountHomePage.clickOnShoppingCart()
    await shoppingCartPage.removeItemFromCart()
    await myAccountHomePage.navigateToMyAccountHomePage()

})

test('TC_SF_014 - Validate navigating to Checkout page when there are no products added to the Shopping Cart',  {tag : '@regression'}, async ({ myAccountHomePage, shoppingCartPage }) => {

    await myAccountHomePage.clickOnCheckoutLink()
    await shoppingCartPage.isShoppingCartLoaded()
   
})

test('TC_SF_015 - Validate navigating to Checkout page', {tag : '@sanity'}, async ({ myAccountHomePage, searchPage, productDisplayPage, shoppingCartPage, checkoutPage }) => {

    const product = JSONUtils.getProductDetails('TC_SF_015')

    await myAccountHomePage.performSearch(product.searchItem)
    await searchPage.isLoaded()
    await searchPage.validateSearchItemIsVisible(product.name)
    await searchPage.clickOnProduct(product.name)
    await productDisplayPage.addToCart()
    await productDisplayPage.clickOnShoppingCartLink()
    await shoppingCartPage.isShoppingCartLoaded()
    await shoppingCartPage.ClickOnCheckout()
    await checkoutPage.isCheckoutPageLoaded()

})