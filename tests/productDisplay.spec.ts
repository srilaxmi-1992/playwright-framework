import { test } from '../fixtures/pageFixtures';
import { config } from "../config/config";
import { JSONUtils } from "../utils/JSONUtils";

test.beforeEach('Test setup', async ({ homePage, loginPage }) => {

    await homePage.clickLoginLink()
    await loginPage.performLogin(config.email, config.password)
    await loginPage.isLoaded()
})

test('TC_SF_009 - Validate that Product Name is displayed in the Product Display Page', {tag : '@smoke'},async ({ myAccountHomePage, searchPage, productDisplayPage }) => {

    const product = JSONUtils.getProductDetails('TC_SF_009')
    await myAccountHomePage.performSearch(product.searchItem)
    await searchPage.isLoaded()
    await searchPage.validateSearchItemIsVisible(product.name)
    await searchPage.clickOnProduct(product.name)
    await productDisplayPage.validateProductHeading(product.name)
})

test('TC_SF_009 - Validate that Product Brand is displayed in the Product Display Page', {tag : '@regression'},async ({ myAccountHomePage, searchPage, productDisplayPage }) => {

    const product = JSONUtils.getProductDetails('TC_SF_009')
    await myAccountHomePage.performSearch(product.searchItem)
    await searchPage.isLoaded()
    await searchPage.validateSearchItemIsVisible(product.name)
    await searchPage.clickOnProduct(product.name)
    if (product.brand)
        await productDisplayPage.validateProductBrand(product.brand)
})

test('TC_SF_009 - Validate that Product Availability is displayed in the Product Display Page', {tag : '@regression'},async ({ myAccountHomePage, searchPage, productDisplayPage }) => {

    const product = JSONUtils.getProductDetails('TC_SF_009')
    await myAccountHomePage.performSearch(product.searchItem)
    await searchPage.isLoaded()
    await searchPage.validateSearchItemIsVisible(product.name)
    await searchPage.clickOnProduct(product.name)
    if (product.availability)
        await productDisplayPage.validateProductAvailability(product.availability)
})

test('TC_SF_009 - Validate that Product Default Quantity is displayed in the Product Display Page', {tag : '@regression'},async ({ myAccountHomePage, searchPage, productDisplayPage }) => {

    const product = JSONUtils.getProductDetails('TC_SF_009')
    await myAccountHomePage.performSearch(product.searchItem)
    await searchPage.isLoaded()
    await searchPage.validateSearchItemIsVisible(product.name)
    await searchPage.clickOnProduct(product.name)
    if (product.defaultQuantity)
        await productDisplayPage.validateDefaultQuantity(product.defaultQuantity)
})

test('TC_SF_010 - Validate Success message When user added product to Add to Cart', {tag : '@smoke'}, async ({ myAccountHomePage, searchPage, productDisplayPage, shoppingCartPage }) => {

    const product = JSONUtils.getProductDetails('TC_SF_010')

    // clean cart
    await myAccountHomePage.clickOnShoppingCart()
    await shoppingCartPage.removeItemFromCart()
    await myAccountHomePage.navigateToMyAccountHomePage()

    await myAccountHomePage.performSearch(product.searchItem)
    await searchPage.isLoaded()
    await searchPage.validateSearchItemIsVisible(product.name)
    await searchPage.clickOnProduct(product.name)
    await productDisplayPage.addToCart()
    if (product.successMessage)
        await productDisplayPage.validateSuccessMessage(product.name, product.successMessage)

})