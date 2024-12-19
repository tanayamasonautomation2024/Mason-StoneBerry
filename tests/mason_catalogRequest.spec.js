const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { SignInPage } from '../pages/mason_signin_page';
import { MasonCatalogRequestPage } from '../pages/mason_catalog_request_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { MyAccountAddressPage } from '../pages/mason_myAccountAddress_page';
import { allure } from 'allure-playwright';
import { sign } from 'crypto';



test.describe("Mason Catalog Request Tests", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    try {
      await page.goto(process.env.WEB_URL);
      await page.waitForTimeout(2000);
      if (isMobile == true) {
        const signinPage = new SignInPage(page);
        await signinPage.clickSignInImage();
        await signinPage.clickSignIn();
        await signinPage.validateSignInDialog();
        await signinPage.login(process.env.USERNAME, process.env.PASSWORD);
        await signinPage.clickSignIn();
      } else {

      }
      const masonHomePageScreenshot = await page.screenshot();
      await testInfo.attach('screenshot', { body: masonHomePageScreenshot, contentType: 'image/png' });
      //await page.screenshot({ path: './screenshots/MasonHomePage.png', fullPage: true });
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }

  })


  test("Validate the Catalog Request page", async ({ page }, testInfo) => {
    const catalogRequestPage = new MasonCatalogRequestPage(page);
    await catalogRequestPage.clickOnCatalogRequestLink();
    await catalogRequestPage.validateTheCatalogRequestPage();
    await catalogRequestPage.validateCatalogRequestForm();
    await catalogRequestPage.validateSignUpSection();

  })


  test("Validate the Catalog Request Form Submission and thank you page", async ({ page }, testInfo) => {
    const catalogRequestPage = new MasonCatalogRequestPage(page);
    await catalogRequestPage.clickOnCatalogRequestLink();
    await catalogRequestPage.validateTheCatalogRequestPage();
    await catalogRequestPage.fillRequestForm();
    await catalogRequestPage.enterEmailAddress();
    await catalogRequestPage.clickRequestCatalogButton();
    await catalogRequestPage.validateThankYouPage();

  })


  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/PageNotFound-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})
