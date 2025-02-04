const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { SignInPage } from '../pages/mason_signin_page';
import { MasonCCPARequestPage } from '../pages/mason_ccpa_request_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { MyAccountAddressPage } from '../pages/mason_myAccountAddress_page';
import { allure } from 'allure-playwright';
import { sign } from 'crypto';



test.describe("Mason CCPA Request Tests", () => {

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


  test("Validate the CCPA Request page", async ({ page }, testInfo) => {
    const ccpaRequestPage = new MasonCCPARequestPage(page);
    await ccpaRequestPage.clickOnCCPARequestLink();
    await ccpaRequestPage.validateTheCCPARequestPage();
    await ccpaRequestPage.validateCCPARequestForm();

  })


  test("Validate the CCPA Request Form Submission and the submitted page", async ({ page }, testInfo) => {
    const ccpaRequestPage = new MasonCCPARequestPage(page);
    await ccpaRequestPage.clickOnCCPARequestLink();
    await ccpaRequestPage.fillRequestForm();
    await ccpaRequestPage.enterEmailAddress();
    await ccpaRequestPage.selectPurposeOfRequest();
    await ccpaRequestPage.clickSubmitButton();
    await ccpaRequestPage.validateSubmittedPage();

    

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
