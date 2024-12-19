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

test.describe("Mason Checkout - Credit Users - Scenarios", () => {
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





  test.describe("Checkout Scenario for the Credit user - ZB Credit", () => {
    test.use({ storageState: './creditUser7.json' });
    test('Checkout Scenario for the Credit user - ZB Credit', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
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

    })
  });

    test.describe("Checkout Scenario for the Credit user - ZB Credit and promo code", () => {
      test.use({ storageState: './creditUser6.json' });
      test('Checkout Scenario for the Credit user - ZB Credit and promo code', async ({ page }) => {
        const guestCheckoutPage = new GuestCheckOutPage(page);
        const signinPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const pdpPage = new PDPPage(page);
        const signinPageNew = new SignInPageNew(page);
        await guestCheckoutPage.clickAddToCart();
        await pdpPage.miniCartDrawer();
        await guestCheckoutPage.clickCheckoutOnMyCart();
        await guestCheckoutPage.validateShippingSectionAbovePaymentSection();
        await guestCheckoutPage.validatePaymentProgressBar();
        await guestCheckoutPage.validatePromoCodeSection();
        await guestCheckoutPage.validateValidPromoCode(cart_data.promocode);
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
  
      }) 
  
    });

    test.describe("Checkout Scenario for the Credit user - Saved CC", () => {
      test.use({ storageState: './creditUser4.json' });
      test('Checkout Scenario for the Credit user - Saved CC', async ({ page }) => {
        const guestCheckoutPage = new GuestCheckOutPage(page);
        const signinPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const pdpPage = new PDPPage(page);
        const signinPageNew = new SignInPageNew(page);
        await guestCheckoutPage.clickAddToCart();
        await pdpPage.miniCartDrawer();
        await guestCheckoutPage.clickCheckoutOnMyCart();
        await guestCheckoutPage.validateShippingSectionAbovePaymentSection();
        await guestCheckoutPage.validatePaymentProgressBar();
        await guestCheckoutPage.clickCreditCard();
        await guestCheckoutPage.validateCreditCardOptions();
        await guestCheckoutPage.validateSavedCardIsSelectedbyDefault();
        await guestCheckoutPage.selectRandomSavedCard();
        await guestCheckoutPage.validateSavedCCDropDownField();
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
  
      }) 
  
    });

    


    test.describe("Checkout Scenario for the Credit user - Saved CC and promo code", () => {
      test.use({ storageState: './creditUser2.json' });
      test('Checkout Scenario for the Credit user - Saved CC and promo code', async ({ page }) => {
        const guestCheckoutPage = new GuestCheckOutPage(page);
        const signinPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const pdpPage = new PDPPage(page);
        const signinPageNew = new SignInPageNew(page);
        await guestCheckoutPage.clickAddToCart();
        await pdpPage.miniCartDrawer();
        await guestCheckoutPage.clickCheckoutOnMyCart();
        await guestCheckoutPage.validateShippingSectionAbovePaymentSection();
        await guestCheckoutPage.validatePaymentProgressBar();
        await guestCheckoutPage.validatePromoCodeSection();
        await guestCheckoutPage.validateValidPromoCode(cart_data.promocode);
        await guestCheckoutPage.clickCreditCard();
        await guestCheckoutPage.validateCreditCardOptions();
        await guestCheckoutPage.validateSavedCardIsSelectedbyDefault();
        await guestCheckoutPage.selectRandomSavedCard();
        await guestCheckoutPage.validateSavedCCDropDownField();
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
  
      }) 
  
    });

    test.describe("Checkout Scenario for the Credit user - New CC", () => {
      test.use({ storageState: './creditUser3.json' });
      test('Checkout Scenario for the Credit user - New CC', async ({ page }) => {
        const guestCheckoutPage = new GuestCheckOutPage(page);
        const signinPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const pdpPage = new PDPPage(page);
        const signinPageNew = new SignInPageNew(page);
        await guestCheckoutPage.clickAddToCart();
        await pdpPage.miniCartDrawer();
        await guestCheckoutPage.clickCheckoutOnMyCart();
        await guestCheckoutPage.validateShippingSectionAbovePaymentSection();
        await guestCheckoutPage.validatePaymentProgressBar();
        // await guestCheckoutPage.validatePromoCodeSection();
        // await guestCheckoutPage.validateValidPromoCode(cart_data.promocode);
        await guestCheckoutPage.clickCreditCard();
        await guestCheckoutPage.selectNewCardButton();
        await guestCheckoutPage.addCardDetails();
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
  
      }) 
  
    });

    test.describe("Checkout Scenario for the Credit user - New CC and promo code", () => {
      test.use({ storageState: './creditUser5.json' });
      test('Checkout Scenario for the Credit user - New CC and promo code', async ({ page }) => {
        const guestCheckoutPage = new GuestCheckOutPage(page);
        const signinPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const pdpPage = new PDPPage(page);
        const signinPageNew = new SignInPageNew(page);
        await guestCheckoutPage.clickAddToCart();
        await pdpPage.miniCartDrawer();
        await guestCheckoutPage.clickCheckoutOnMyCart();
        await guestCheckoutPage.validateShippingSectionAbovePaymentSection();
        await guestCheckoutPage.validatePaymentProgressBar();
        await guestCheckoutPage.validatePromoCodeSection();
        await guestCheckoutPage.validateValidPromoCode(cart_data.promocode);
        await guestCheckoutPage.clickCreditCard();
        await guestCheckoutPage.selectNewCardButton();
        await guestCheckoutPage.addCardDetails();
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