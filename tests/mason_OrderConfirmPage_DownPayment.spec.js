const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { SignInPage } from '../pages/mason_signin_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { ResetPage } from '../pages/mason_reset_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { GuestCheckOutPage } from '../pages/mason_guestCheckout_page';
import { CreateAccountPage } from '../pages/mason_createAccount_page';
import { OrderConfirmationPage } from '../pages/mason_order_confirmation_page';
import {OrderConfDownPayment} from '../pages/mason_orderconf_downpaymentdrawer';
import { allure } from 'allure-playwright';
import { sign } from 'crypto';
require('dotenv').config();


const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const resetpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_reset_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const checkout_data = JSON.parse(JSON.stringify(require('../test_data/mason_checkout_page_data.json')));
const cart_data = JSON.parse(JSON.stringify(require('../test_data/mason_cart_page_data.json')));
const savedAddress = myaccountpage_data.myaccount_newaddress_firstname + " " + myaccountpage_data.myaccount_newaddress_lastname + " " + myaccountpage_data.myaccount_newaddress_addressline1;
const editAddress = myaccountpage_data.myaccount_editaddress_firstname + " " + myaccountpage_data.myaccount_editaddress_lastname + " " + myaccountpage_data.myaccount_editaddress_addressline1;

test.describe("Mason - Credit Users - Down Payment - Scenarios", () => {
  test.setTimeout(90000);
  test.beforeEach(async ({ page }, testInfo) => {
    test.slow();
    try {
      await page.goto(process.env.WEB_URL);
      await page.goto(checkout_data.pdp_url_no_size_color);
      await page.waitForTimeout(3000);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }
  });





  test.describe("Verify the DownPayment section in Order Confirmation Page", () => {
    test.use({ storageState: './creditUser5.json' });
    test('Verify the DownPayment section in Order Confirmation Page', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      const orderDownPay = new OrderConfDownPayment(page);
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSectionAbovePaymentSection();
      await guestCheckoutPage.validatePaymentProgressBar();
      await guestCheckoutPage.clickContinueToReview();
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateReviewProgressBar();
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
    // await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();
      await orderDownPay.validateOrderConfDownPaymentSection();

    })
  });

  test.describe("Verify the DownPayment section - Learn More and Maybe Later in Order Confirmation Page", () => {
    test.use({ storageState: './creditUser2.json' });
    test('Verify the DownPayment section - Learn More and Maybe Later in Order Confirmation Page', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      const orderDownPay = new OrderConfDownPayment(page);
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSectionAbovePaymentSection();
      await guestCheckoutPage.validatePaymentProgressBar();
      await guestCheckoutPage.clickContinueToReview();
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateReviewProgressBar();
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderDownPay.validateOrderConfDownPaymentSection();
      await orderDownPay.clickOnDownPaymentLearnMoreButton();
      await orderDownPay.validateMaybeLaterDrawer();
      await orderDownPay.clickOnMaybeLaterButton();

    })
  });

  test.describe("Verify the DownPayment section in Order Confirmation Page - Validate the DownPayment Drawer and Close/Cancel it", () => {
    test.use({ storageState: './dpUser.json' });
    test('Validate the DownPayment Drawer and Close/Cancel it', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      const orderDownPay = new OrderConfDownPayment(page);
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSectionAbovePaymentSection();
      await guestCheckoutPage.validatePaymentProgressBar();
      await guestCheckoutPage.clickContinueToReview();
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateReviewProgressBar();
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderDownPay.validateOrderConfDownPaymentSection();

      //Validating Make Payment Drawer and closing it using the X button
      await orderDownPay.clickOnMakeADownPaymentButton();
      await orderDownPay.validateOrderConfDownPaymentDrawer();
      await orderDownPay.clickOnDownPaymentDrawerCloseButton();

      //Clicking Make Payment Button and closing it using the cancel button
      await orderDownPay.clickOnMakeADownPaymentButton();
      await orderDownPay.clickOnDownPaymentDrawerCancelButton();


    })
  });

  test.describe("Verify the Edit/Submit Down Payment section in Down Payment Drawer", () => {
    test.use({ storageState: './creditUser6.json' });
    test('Verify the Edit/Submit Down Payment section in Down Payment Drawer', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      const orderDownPay = new OrderConfDownPayment(page);
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSectionAbovePaymentSection();
      await guestCheckoutPage.validatePaymentProgressBar();
      await guestCheckoutPage.clickContinueToReview();
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateReviewProgressBar();
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderDownPay.validateOrderConfDownPaymentSection();
      await orderDownPay.clickOnMakeADownPaymentButton();
      await orderDownPay.clickOnDownPaymentDrawerReviewDownPaymentButton();
      await orderDownPay.validateReviewDownPayment();

      //Edit Down Payment --- just click button and verify if user is navigated to Down Payment Drawer
      await orderDownPay.clickOnEditReviewPaymentButton();

      //Submit Down Payment --- just click button and verify if user is navigated to Submit Down Payment Drawer
      await orderDownPay.clickOnDownPaymentDrawerReviewDownPaymentButton();
      await orderDownPay.clickOnSubmitReviewPaymentButton();
    })
  });



  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/LoggedCheckout-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})