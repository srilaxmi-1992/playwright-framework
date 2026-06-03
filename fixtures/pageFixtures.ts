import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SearchPage } from '../pages/SearchPage';
import { MyAccountHomePage } from '../pages/MyAccountHomePage';
import { config } from '../config/config';
import { ProductDisplayPage } from '../pages/ProductDisplayPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage'

type PageFixtures = {
    homePage: HomePage
    loginPage: LoginPage
    searchPage: SearchPage
    myAccountHomePage: MyAccountHomePage
    productDisplayPage: ProductDisplayPage
    shoppingCartPage: ShoppingCartPage
};

export const test = base.extend<PageFixtures>({

    homePage: async ({ page }, use) => {
        await page.goto(config.baseURL)
        await use(new HomePage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    searchPage: async ({ page }, use) => {
        await use(new SearchPage(page));
    },
    myAccountHomePage: async ({ page }, use) => {
        await use(new MyAccountHomePage(page));
    },
    productDisplayPage: async ({ page }, use) => {
        await use(new ProductDisplayPage(page));
    },
    shoppingCartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    },

});