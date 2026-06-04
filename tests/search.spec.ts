import { expect } from "@playwright/test";
import { test } from '../fixtures/pageFixtures';
import { config } from "../config/config";
import { JSONUtils } from "../utils/JSONUtils";

test.beforeEach('Test setup', async ({ homePage, loginPage }) => {

    await homePage.clickLoginLink()
    await loginPage.performLogin(config.email, config.password)
    await loginPage.isLoaded()
})

test('TC_SF_001 - Validate searching with an existing Product Name', { tag: '@smoke' }, async ({ myAccountHomePage, searchPage }) => {

    const product = JSONUtils.getProductDetails('TC_SF_001')
    await myAccountHomePage.performSearch(product.searchItem)
    await searchPage.isLoaded()
    await searchPage.validateSearchItemIsVisible(product.name)
})

test('TC_SF_002 - Validate searching with a non existing Product Name', { tag: '@regression' }, async ({ myAccountHomePage, searchPage }) => {

    const product = JSONUtils.getProductDetails('TC_SF_002')
    await myAccountHomePage.performSearch(product.searchItem)
    await searchPage.isLoaded()
    await searchPage.validateNoResultsFound()
})

test('TC_SF_003 - Validate searching without providing any Product Name', { tag: '@regression' }, async ({ myAccountHomePage, searchPage }) => {

    await myAccountHomePage.performSearch('')
    await searchPage.isLoaded()
    await searchPage.validateNoResultsFound()
})

test('TC_SF_004 - Validate searching by providing a search criteria which results in mulitple products', { tag: '@regression' }, async ({ myAccountHomePage, searchPage }) => {
    const product = JSONUtils.getProductDetails('TC_SF_004')
    await myAccountHomePage.performSearch(product.searchItem)
    await searchPage.isLoaded()
    expect(await searchPage.countOfSearchresults()).toBeGreaterThan(1)
    await searchPage.validateMultipleSearchItemAreVisible()
})

test('TC_SF_005 - Validate searching using Search Criteria field', { tag: '@regression' }, async ({ myAccountHomePage, searchPage }) => {

    const product = JSONUtils.getProductDetails('TC_SF_005')
    await myAccountHomePage.performSearch('')
    await searchPage.isLoaded()
    await searchPage.searchUsingSearchCriteria(product.searchItem)
    await searchPage.validateSearchItemIsVisible(product.name)
})


test('TC_SF_006 - Validate Search using the text from the product description', { tag: '@regression' }, async ({ myAccountHomePage, searchPage }) => {


    const product = JSONUtils.getProductDetails('TC_SF_006')
    await myAccountHomePage.performSearch('')
    await searchPage.isLoaded()
    await searchPage.searchUsingSearchCriteriaWithDesc(product.searchItem)
    await searchPage.validateSearchItemIsVisible(product.name)
})

test('TC_SF_007 - Validate Search by selecting the category of product', { tag: '@regression' }, async ({ myAccountHomePage, searchPage }) => {


    const product = JSONUtils.getProductDetails('TC_SF_007')
    await myAccountHomePage.performSearch('')
    await searchPage.isLoaded()
    if (product.categoryValue) {
        await searchPage.searchUsingCategory(product.searchItem, product.categoryValue)
        await searchPage.validateSearchItemIsVisible(product.name)
    } else {
        console.log("No Category Provided")
    }
})

test('TC_SF_008 - Validate Search by selecting the wrong category of product', { tag: '@regression' }, async ({ myAccountHomePage, searchPage }) => {


    const product = JSONUtils.getProductDetails('TC_SF_008')
    await myAccountHomePage.performSearch('')
    await searchPage.isLoaded()
    if (product.categoryValue) {
        await searchPage.searchUsingCategory(product.searchItem, product.categoryValue)
        await searchPage.validateNoResultsFound()
    } else {
        console.log("No Category Provided")
    }
})

// Data Driven Test
const products = JSONUtils.getProducts('TC_SF_0016');

test.describe('Search Product Data Driven Tests', () => {

    for (const product of products) {

        test(`Validate searching product: ${product.name}`, { tag: '@smoke' }, async ({
            myAccountHomePage,
            searchPage
        }) => {

            await myAccountHomePage.performSearch(product.searchItem);
            await searchPage.isLoaded();
            await searchPage.validateSearchItemIsVisible(product.name);

        });

    }

});
test.afterEach('Tear Down', async ({ myAccountHomePage }) => {

    await myAccountHomePage.logout()

})