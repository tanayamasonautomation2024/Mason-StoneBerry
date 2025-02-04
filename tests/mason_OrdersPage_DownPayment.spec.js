const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { CartDrawerPage } from '../pages/mason_cart_drawer_page';
import { CartPage } from '../pages/mason_cart_page';
import { EmptyCartPage } from '../pages/mason_emptycart_page';
import { OrderDetailsPage } from '../pages/mason_orderdetails_page';
import {OrderConfDownPayment} from '../pages/mason_orderconf_downpaymentdrawer';
import { allure } from 'allure-playwright';
import fs from 'fs';
require('dotenv').config();
const creditUserFile = './credituser.json';
const nonCreditUserFile = './noncredituser.json';
const newUserFile = './newuser.json';
const globalUser1File = './globaluser1.json';
const orderDetailsCancelOrderFile = './orderdetailscancelorder.json';
const paymentUserFile = './dpUser.json';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const signoutpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signout_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const pdp_data = JSON.parse(JSON.stringify(require('../test_data/mason_pdp_page_data.json')));
const minicart_data = JSON.parse(JSON.stringify(require('../test_data/mason_minicart_page_data.json')));
const cart_data = JSON.parse(JSON.stringify(require('../test_data/mason_cart_page_data.json')));

let loginSuccessful = false;
test.describe("Mason Order Page - Make a Down Payment", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    const storageStatePath = isMobile ? paymentUserFile : paymentUserFile;

    if (fs.existsSync(storageStatePath)) {
      await page.context().addCookies(JSON.parse(fs.readFileSync(storageStatePath, 'utf-8')).cookies);
      loginSuccessful = true;
    } else {
      console.error("Login state is not available, skipping test.");
      test.skip('Skipping test because login state is not available');
    }

    try {
      await page.goto(process.env.WEB_URL);
      //await page.waitForLoadState('networkidle');
    } catch (error) {
      console.error("Navigation failed:", error);
      test.skip('Skipping test because navigation failed');
    }
  })
  test.afterEach(async ({ page }) => {
    const start = Date.now();

    // Perform tasks in parallel
    await Promise.all([
      process.env.TAKE_SCREENSHOTS && page.screenshot({ path: 'screenshot.png' }),
      page.close(),
      //context.close()
    ]);

    console.log(`AfterHooks completed in ${Date.now() - start}ms`);
  });

  
  test("My Account Order details - Validate Order Down Payment Drawer", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    const orderDownPay = new OrderConfDownPayment(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.clickOnMakeADownPaymentButton();
    await orderDetailsPage.validateOrderConfDownPaymentDrawer();
    

  })

  test("My Account Order details - Validate Order Down Payment Drawer Close/Cancel", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    const orderDownPay = new OrderConfDownPayment(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.clickOnMakeADownPaymentButton();
    await orderDetailsPage.validateOrderConfDownPaymentDrawer();
    await orderDetailsPage.clickOnDownPaymentDrawerCloseButton();

      //Clicking Make Payment Button and closing it using the cancel button
    await orderDetailsPage.clickOnMakeADownPaymentButton();
    await orderDetailsPage.clickOnDownPaymentDrawerCancelButton();

  })

  test("My Account Order details - Verify the Edit/Submit Down Payment section in Down Payment Drawer", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    const orderDownPay = new OrderConfDownPayment(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountOrderLink();
    const orderDetailsPage = new OrderDetailsPage(page);
    await orderDetailsPage.clickOnMakeADownPaymentButton();
    await orderDetailsPage.validateOrderConfDownPaymentDrawer();
    await orderDownPay.clickOnDownPaymentDrawerReviewDownPaymentButton();
    await orderDownPay.validateReviewDownPayment();

      //Edit Down Payment --- just click button and verify if user is navigated to Down Payment Drawer
    await orderDetailsPage.clickOnEditReviewPaymentButton();

      //Submit Down Payment --- just click button and verify if user is navigated to Submit Down Payment Drawer
    await orderDownPay.clickOnDownPaymentDrawerReviewDownPaymentButton();
    await orderDetailsPage.clickOnSubmitReviewPaymentButton();

  })


  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/OrderDetails-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})