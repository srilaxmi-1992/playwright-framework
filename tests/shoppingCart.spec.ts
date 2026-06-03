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

test('TC_SF_011 - Validate navigating to Shopping Cart page from the Success message', async ({ myAccountHomePage, searchPage, productDisplayPage, shoppingCartPage }) => {

    const product = JSONUtils.getProductDetails('TC_SF_011')

    await myAccountHomePage.performSearch(product.searchItem)
    await searchPage.isLoaded()
    await searchPage.validateSearchItemIsVisible(product.name)
    await searchPage.clickOnProduct(product.name)
    await productDisplayPage.addToCart()
    await productDisplayPage.clickOnShoppingCartLink()
    await shoppingCartPage.isShoppingCartLoaded()

})


test('TC_SF_012 - Validate navigating to Shopping Cart page from the Success message', async ({ myAccountHomePage, searchPage, productDisplayPage, shoppingCartPage }) => {

    const product = JSONUtils.getProductDetails('TC_SF_012')

    await myAccountHomePage.performSearch(product.searchItem)
    await searchPage.isLoaded()
    await searchPage.validateSearchItemIsVisible(product.name)
    await searchPage.clickOnProduct(product.name)
    await productDisplayPage.addToCart()

    await myAccountHomePage.clickOnShoppingCart()
    await shoppingCartPage.isShoppingCartLoaded()

})

test('TC_SF_013 - Validate the Cart button when there are no products added to the Shopping Cart', async ({ myAccountHomePage, searchPage, productDisplayPage, shoppingCartPage }) => {

    
    await myAccountHomePage.clickOnShoppingCart()
    await shoppingCartPage.validateEmptyShoppingCart()
    await myAccountHomePage.navigateToMyAccountHomePage()

})


test.afterEach('Tear Down', async ({ myAccountHomePage }) => {

    await myAccountHomePage.logout()

})