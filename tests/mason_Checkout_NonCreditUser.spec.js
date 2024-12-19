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

test.describe("Mason Checkout - Non Credit Users - Scenarios", () => {
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




  test.describe("Checkout Scenario for the guest user - login with no address or credit", () => {
    test('Verify Checkout Scenario for the guest user - login with no address or credit - go to shipping scenario', async ({ page }) => {
      // Navigate to the page containing the popular search terms
      const signinPage = new SignInPage(page);
      const signinPageNew = new SignInPageNew(page);
      const guestCheckoutPage = new GuestCheckOutPage(page);
      //await guestCheckoutPage.selectAnOptionFromSearchSuggestion('Yellow');
      const pdpPage = new PDPPage(page);
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateSecureCheckout();
      await signinPage.login(process.env.NEW_USER, process.env.PROFILE_PASSWORD);
      await signinPage.clickSignIn();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(5000);
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.clickCreditCard();
      await guestCheckoutPage.addCardDetails();
      //await guestCheckoutPage.enterEmailDetails(email);
      await guestCheckoutPage.clickContinueToReview();
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
      await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();

     
    })
  });



  test.describe("Verify Checkout Scenario for the loggedIn Non-Credit User - add new address and new CC", () => {
   // test.use({ storageState: './newuser.json' });
    test('Verify Checkout Scenario for the loggedIn Non-Credit User - add new address and new CC', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await homePage.clickOnHomePageSignIn();
      
      const createAccountPage = new CreateAccountPage(page);
      const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
      const password = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
      await signinPage.clickCreateAnAccount();
      await createAccountPage.clickOnCreateAccount();
      await createAccountPage.enterNameDetailsOnCreateAccountPage(firstname, lastname);
      await createAccountPage.enterEmailOnAccountPage(email);
      await createAccountPage.enterPasswordOnCreateAccountPage(password);
      await createAccountPage.clickOnCreateAccount();
      await createAccountPage.accountCreationSuccessMessage();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
    
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateProgressBar();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.validateNewAddressModal();
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.addShippingAddress();
     // await guestCheckoutPage.clickSaveAddress();
      await guestCheckoutPage.validateItemsInCartSection();
      await guestCheckoutPage.validateGiftMessage();

      await guestCheckoutPage.clickOnContinueToPayment();
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateAddressVerification();
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validatePaymentSection();
      await guestCheckoutPage.validateMyCreditIsSelectedbyDefault();
      await guestCheckoutPage.clickCreditCard();
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
      await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();
      
    })

  });


  

  test("Non Credit user placing an order with a ZB credit", async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await homePage.clickOnHomePageSignIn();
      
      const createAccountPage = new CreateAccountPage(page);
      const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
      const password = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
      await signinPage.clickCreateAnAccount();
      await createAccountPage.clickOnCreateAccount();
      await createAccountPage.enterNameDetailsOnCreateAccountPage(firstname, lastname);
      await createAccountPage.enterEmailOnAccountPage(email);
      await createAccountPage.enterPasswordOnCreateAccountPage(password);
      await createAccountPage.clickOnCreateAccount();
      await createAccountPage.accountCreationSuccessMessage();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.validatePaymentMethods();
      await guestCheckoutPage.validateMyCreditIsSelectedbyDefault();
      await guestCheckoutPage.fillDOB();
      await guestCheckoutPage.fillSSN();
      //await guestCheckoutPage.clickIAgreeToTermsForZBCredit();
      await guestCheckoutPage.clickContinueToReview();
      await guestCheckoutPage.validatePreQualificationResultsSection();

      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      //await orderConfPage.validateOrderConfThankYouText();
      await orderConfPage.validateOrderConfOrderDetails();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
    // await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();
  });

  test.describe("Verify Checkout Scenario for the loggedIn Non-Credit User - add new address and new CC - and Promo Code", () => {
    test.use({ storageState: './newuser.json' });
    test('Verify Checkout Scenario for the loggedIn Non-Credit User - add new address and new CC - and Promo Code', async ({ page }) => {
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
    
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateProgressBar();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.validateNewAddressModal();
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.validatePromoCodeSection();
      await guestCheckoutPage.validateValidPromoCode(cart_data.promocode);
      //await guestCheckoutPage.clickSaveAddress();
      await guestCheckoutPage.validateItemsInCartSection();
      await guestCheckoutPage.validateGiftMessage();
      
      await guestCheckoutPage.clickOnContinueToPayment();
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validateAddressVerification();
      await page.waitForLoadState('networkidle');
      await guestCheckoutPage.validatePaymentSection();
      await guestCheckoutPage.validateMyCreditIsSelectedbyDefault();
      await guestCheckoutPage.clickCreditCard();
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
      await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();
    })

  });

  test("Non Credit user placing an order with a ZB credit and promo code", async ({ page }) => {
    const guestCheckoutPage = new GuestCheckOutPage(page);
      const signinPage = new SignInPage(page);
      const homePage = new HomePage(page);
      const pdpPage = new PDPPage(page);
      const signinPageNew = new SignInPageNew(page);
      await homePage.clickOnHomePageSignIn();
      
      const createAccountPage = new CreateAccountPage(page);
      const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
      const password = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
      await signinPage.clickCreateAnAccount();
      await createAccountPage.clickOnCreateAccount();
      await createAccountPage.enterNameDetailsOnCreateAccountPage(firstname, lastname);
      await createAccountPage.enterEmailOnAccountPage(email);
      await createAccountPage.enterPasswordOnCreateAccountPage(password);
      await createAccountPage.clickOnCreateAccount();
      await createAccountPage.accountCreationSuccessMessage();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.validatePromoCodeSection();
      await guestCheckoutPage.validateValidPromoCode(cart_data.promocode);
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.validatePaymentMethods();
      await guestCheckoutPage.validateMyCreditIsSelectedbyDefault();
      await guestCheckoutPage.fillDOB();
      await guestCheckoutPage.fillSSN();
      //await guestCheckoutPage.clickIAgreeToTermsForZBCredit();
      
      await guestCheckoutPage.clickContinueToReview();
      await guestCheckoutPage.validatePreQualificationResultsSection();

      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      //await orderConfPage.validateOrderConfThankYouText();
      await orderConfPage.validateOrderConfOrderDetails();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
    // await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();
  });




  test.describe("Checkout Scenario for the Non Credit user - saved CC", () => {
    test.use({ storageState: './savedCardUser2.json' });
    test('Checkout Scenario for the Non Credit user - saved CC', async ({ page }) => {
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
      await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();

    })

    test.describe("Checkout Scenario for the Non Credit user - saved CC and promo code", () => {
      test.use({ storageState: './savedCardUser.json' });
      test('Checkout Scenario for the Non Credit user - saved CC and promo code', async ({ page }) => {
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
        await orderConfPage.validateOrderConfirmationPayment();
        await orderConfPage.validateProductSection();
  
      }) 
  
    });

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