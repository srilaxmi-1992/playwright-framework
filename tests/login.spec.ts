import { test } from "../fixtures/pageFixtures";
import { config } from "../config/config";


test('Validate login with valid credentials', async ({ loginPage, homePage }) => {
    await homePage.clickLoginLink()
    await loginPage.performLogin(config.email, config.password)
    await loginPage.isLoaded()
})