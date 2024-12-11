const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { SignInPage } from '../pages/mason_signin_page';
import { ResetPage } from '../pages/mason_reset_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { GuestCheckOutPage } from '../pages/mason_guestCheckout_page';
import { OrderConfirmationPage } from '../pages/mason_order_confirmation_page';
import { PDPPage } from '../pages/mason_pdp_page';
import { allure } from 'allure-playwright';
import { expectWithTimeoutHandling } from '../utils/errorHandling';
import { TimeoutError } from '../utils/errorHandler';
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

test.describe("Mason Checkout - Guest Users - Scenarios", () => {
  test.setTimeout(90000);
  test.beforeEach(async ({ page }, testInfo) => {
    test.slow();
    try {
      await page.goto(process.env.WEB_URL);
      await page.goto(checkout_data.pdp_url_add_to_cart);
      //await page.waitForLoadState('networkidle');
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }
  });



  test('Verify Checkout Scenario for the guest user', async ({ page }) => {
    // Navigate to the page containing the popular search terms
    const guestCheckoutPage = new GuestCheckOutPage(page);
    //await guestCheckoutPage.selectAnOptionFromSearchSuggestion('Yellow');
    const pdpPage = new PDPPage(page);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnPDPSizeVariantButton();
    await guestCheckoutPage.clickAddToCart();
    await pdpPage.miniCartDrawer();
    await guestCheckoutPage.clickCheckoutOnMyCart();
    await guestCheckoutPage.validateSecureCheckout();
    await guestCheckoutPage.continueCheckoutAsGuest();
    //await page.waitForTimeout(5000);
    await guestCheckoutPage.validateShippingSection();

  })

  test('Verify closing of cart - Checkout Scenario for the guest user', async ({ page }) => {
    // Navigate to the page containing the popular search terms
    const guestCheckoutPage = new GuestCheckOutPage(page);
    const pdpPage = new PDPPage(page);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnPDPSizeVariantButton();
    await guestCheckoutPage.clickAddToCart();
    await pdpPage.miniCartDrawer();
    await guestCheckoutPage.clickCloseCart();
  })



  test('Validate the Progress Bar for the checkout scenario', async ({ page }) => {
    // Navigate to the page containing the popular search terms
    const guestCheckoutPage = new GuestCheckOutPage(page);
    const pdpPage = new PDPPage(page);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnPDPSizeVariantButton();
    await guestCheckoutPage.clickAddToCart();
    await pdpPage.miniCartDrawer();
    await guestCheckoutPage.clickCheckoutOnMyCart();
    await guestCheckoutPage.validateSecureCheckout();
    await guestCheckoutPage.continueCheckoutAsGuest();
    //await page.waitForTimeout(1000);
    await guestCheckoutPage.validateShippingSection();
    await guestCheckoutPage.validateProgressBar();
  })


  test('Verify return to cart for guest user', async ({ page }) => {
    const guestCheckoutPage = new GuestCheckOutPage(page);
    const pdpPage = new PDPPage(page);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnPDPSizeVariantButton();
    await guestCheckoutPage.clickAddToCart();
    await pdpPage.miniCartDrawer();
    await guestCheckoutPage.clickCheckoutOnMyCart();
    await guestCheckoutPage.validateSecureCheckout();
    await guestCheckoutPage.continueCheckoutAsGuest();
    await guestCheckoutPage.validateShippingSection();
    await guestCheckoutPage.validateReturnToCart();

  })

  //Need Help section
  test('Verify Need Help section - go to shipping scenario', async ({ page }) => {
    // Navigate to the page containing the popular search terms
    const guestCheckoutPage = new GuestCheckOutPage(page);
    const pdpPage = new PDPPage(page);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnPDPSizeVariantButton();
    await guestCheckoutPage.clickAddToCart();
    await pdpPage.miniCartDrawer();
    await guestCheckoutPage.clickCheckoutOnMyCart();
    await guestCheckoutPage.validateSecureCheckout();
    await guestCheckoutPage.continueCheckoutAsGuest();

    await guestCheckoutPage.validateShippingSection();
    await guestCheckoutPage.validateProgressBar();
    await guestCheckoutPage.validateNeedHelpSection();
    await guestCheckoutPage.validateCallSection();
    await guestCheckoutPage.validateEmailSection();

  })

  //New Address
  test('Verify add/edit New Address - go to shipping scenario', async ({ page }) => {
    // Navigate to the page containing the popular search terms
    const guestCheckoutPage = new GuestCheckOutPage(page);
    const pdpPage = new PDPPage(page);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnPDPSizeVariantButton();
    await guestCheckoutPage.clickAddToCart();
    await pdpPage.miniCartDrawer();
    await guestCheckoutPage.clickCheckoutOnMyCart();
    await guestCheckoutPage.validateSecureCheckout();
    await guestCheckoutPage.continueCheckoutAsGuest();
    await guestCheckoutPage.validateShippingSection();
    await guestCheckoutPage.validateProgressBar();
    await guestCheckoutPage.validateNewAddressModal();
    await guestCheckoutPage.validateNewAddressModal();
    await guestCheckoutPage.addShippingAddress();
    await guestCheckoutPage.validateItemsInCartSection();
    await guestCheckoutPage.validateGiftMessage();
    const shippingOptions = ['Priority', 'Standard', 'Express'];
    for (const option of shippingOptions) {
      await guestCheckoutPage.verifyShippingOptionVisibility(option);
    }

    await guestCheckoutPage.clickOnContinueToPayment();
    await guestCheckoutPage.validateAddressVerification();
    await guestCheckoutPage.clickOnEditAddress();
    await guestCheckoutPage.addShippingAddress();

    await guestCheckoutPage.validateGiftMessage();
    await guestCheckoutPage.clickOnContinueToPayment();
    await guestCheckoutPage.validateAddressVerification();
    await guestCheckoutPage.validatePaymentSection();

  })


  test('Verify Shipping Methods - Guest User - go to shipping scenario', async ({ page }) => {
    const guestCheckoutPage = new GuestCheckOutPage(page);
    const pdpPage = new PDPPage(page);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnPDPSizeVariantButton();
    await guestCheckoutPage.clickAddToCart();
    await pdpPage.miniCartDrawer();
    await guestCheckoutPage.clickCheckoutOnMyCart();
    await guestCheckoutPage.validateSecureCheckout();
    await guestCheckoutPage.continueCheckoutAsGuest();
    await guestCheckoutPage.validateShippingSection();

    // List of shipping options to verify
    const shippingOptions = ['Priority', 'Standard', 'Express'];
    for (const option of shippingOptions) {
      await guestCheckoutPage.verifyShippingOptionVisibility(option);
    }
  })


  test('Verify CreateAccount - Guest User - go to shipping scenario', async ({ page }) => {
    const guestCheckoutPage = new GuestCheckOutPage(page);
    const pdpPage = new PDPPage(page);
    await pdpPage.clickOnPDPColorVariantButton();
    await pdpPage.clickOnPDPSizeVariantButton();
    await guestCheckoutPage.clickAddToCart();
    await pdpPage.miniCartDrawer();
    await guestCheckoutPage.clickCheckoutOnMyCart();
    await guestCheckoutPage.validateSecureCheckout();
    await guestCheckoutPage.continueCheckoutAsGuest();
    await guestCheckoutPage.validateShippingSection();
    await guestCheckoutPage.validateNewAddressModal();
    await guestCheckoutPage.addShippingAddress();
    await guestCheckoutPage.clickOnContinueToPayment();
    await guestCheckoutPage.validateAddressVerification();
    await guestCheckoutPage.validateCreateAccountOnCheckoutPage();
    await guestCheckoutPage.clickOnSignIn();
  })


    test("Guest user with cc- promo code", async ({ page }) => {
      try {
        const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
        const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
        const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
        const guestCheckoutPage = new GuestCheckOutPage(page);
        const pdpPage = new PDPPage(page);
        await expectWithTimeoutHandling(async () => {
          await pdpPage.clickOnPDPColorVariantButton();
        }, 'Clicking on PDP color variant button');

        await expectWithTimeoutHandling(async () => {
          await pdpPage.clickOnMultiplePDPSizeVariantButton();
        }, 'Clicking on PDP size variant button');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickAddToCart();
        }, 'Clicking Add to Cart');

        await expectWithTimeoutHandling(async () => {
          await pdpPage.miniCartDrawer();
        }, 'Opening mini cart drawer');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickCheckoutOnMyCart();
        }, 'Clicking checkout on My Cart');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.validateSecureCheckout();
        }, 'Validating secure checkout');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.continueCheckoutAsGuest();
        }, 'Continuing checkout as guest');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.validateShippingSection();
        }, 'Validating shipping section');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.validateNewAddressModal();
        }, 'Validating new address modal');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.addShippingAddress();
        }, 'Adding shipping address');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.validatePromoCodeSection();
          await guestCheckoutPage.validateValidPromoCode(cart_data.promocode);
        }, 'Applied Promo Code');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickOnContinueToPayment();
        }, 'Clicking on Continue to Payment');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.validateAddressVerification();
        }, 'Validating address verification');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickCreditCard();
        }, 'Clicking on credit card');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.addCardDetails();
        }, 'Adding card details');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.enterEmailDetails(email);
        }, 'Entering email details');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickContinueToReview();
        }, 'Clicking Continue to Review');

        await expectWithTimeoutHandling(async () => {
          await guestCheckoutPage.clickOnPlaceOrderButton();
        }, 'Clicking on Place Order button');

        const orderConfPage = new OrderConfirmationPage(page);

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfOrderDetails();
        }, 'Validating order confirmation order details');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfirmationOrderSummary();
        }, 'Validating order confirmation order summary');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfirmationShippingDetails();
        }, 'Validating order confirmation shipping details');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfirmationBillingAddress();
        }, 'Validating order confirmation billing address');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfirmationPayment();
        }, 'Validating order confirmation payment');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateProductSection();
        }, 'Validating product section');

        await expectWithTimeoutHandling(async () => {
          await orderConfPage.validateOrderConfGuestUserCreateAccount();
        }, 'Validating order confirmation create account section');

      } catch (error) {
        if (error instanceof TimeoutError) {
          console.error(`Timeout occurred: ${error.message}`);
        } else {
          console.error('Error during test execution:', error);
        }
        throw new Error(`Test failed due to error: ${error.message}`);
      }
    });
  
 
    test("Guest user placing an order with a credit card", async ({ page }) => {
      const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const pdpPage = new PDPPage(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateSecureCheckout();
      await guestCheckoutPage.continueCheckoutAsGuest();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.clickCreditCard();
      await guestCheckoutPage.addCardDetails();
      await guestCheckoutPage.enterEmailDetails(email);
      await guestCheckoutPage.clickContinueToReview();
      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfOrderDetails();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
      await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();
      await expectWithTimeoutHandling(async () => {
        await orderConfPage.validateOrderConfGuestUserCreateAccount();
      }, 'Validating order confirmation create account section');
    });

    test("Guest user - Check the different billing address message", async ({ page }) => {
      const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
      const password = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const pdpPage = new PDPPage(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateSecureCheckout();
      await guestCheckoutPage.continueCheckoutAsGuest();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.validatePaymentMethods();
      await guestCheckoutPage.validateMyCreditIsSelectedbyDefault();
      await guestCheckoutPage.fillDOB();
      await guestCheckoutPage.fillSSN();
      await guestCheckoutPage.clickIAgreeToTermsForZBCredit();
      await guestCheckoutPage.validateTermsAndConditionSection();
      await guestCheckoutPage.clickSameAsShippingCheckbox();
      await guestCheckoutPage.validateDifferentAddressMessage();
    
    });


    test("Guest user - validate Terms & Condition of ZB credit in checkout", async ({ page }) => {
      const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
      const password = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const pdpPage = new PDPPage(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateSecureCheckout();
      await guestCheckoutPage.continueCheckoutAsGuest();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.validatePaymentMethods();
      await guestCheckoutPage.validateMyCreditIsSelectedbyDefault();
      await guestCheckoutPage.fillDOB();
      await guestCheckoutPage.fillSSN();
      await guestCheckoutPage.clickIAgreeToTermsForZBCredit();
      await guestCheckoutPage.validateTermsAndConditionSection();
      await guestCheckoutPage.validateCreateAccountOnCheckoutPage();
      
    });


    test("Guest user placing an order with a ZB credit", async ({ page }) => {
      const firstname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const lastname = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + [...Array(9)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
      const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@automation.com`;
      const password = [...Array(6)].map(() => String.fromCharCode(Math.random() * 26 + 97 | 0)).join('') + String.fromCharCode(Math.random() * 26 + 65 | 0) + (Math.random() * 10 | 0);
      const guestCheckoutPage = new GuestCheckOutPage(page);
      const pdpPage = new PDPPage(page);
      await pdpPage.clickOnPDPColorVariantButton();
      await pdpPage.clickOnMultiplePDPSizeVariantButton();
      await guestCheckoutPage.clickAddToCart();
      await pdpPage.miniCartDrawer();
      await guestCheckoutPage.clickCheckoutOnMyCart();
      await guestCheckoutPage.validateSecureCheckout();
      await guestCheckoutPage.continueCheckoutAsGuest();
      await guestCheckoutPage.validateShippingSection();
      await guestCheckoutPage.validateNewAddressModal();
      await guestCheckoutPage.addShippingAddress();
      await guestCheckoutPage.clickOnContinueToPayment();
      await guestCheckoutPage.validateAddressVerification();
      await guestCheckoutPage.validatePaymentMethods();
      await guestCheckoutPage.validateMyCreditIsSelectedbyDefault();
      await guestCheckoutPage.fillDOB();
      await guestCheckoutPage.fillSSN();
      await guestCheckoutPage.clickIAgreeToTermsForZBCredit();
      await guestCheckoutPage.createAccountForZBCredit(email,password);
      await guestCheckoutPage.clickContinueToReview();
      await guestCheckoutPage.validatePreQualificationResultsSection();

      await guestCheckoutPage.clickOnPlaceOrderButton();
      const orderConfPage = new OrderConfirmationPage(page);
      await orderConfPage.validateOrderConfPendingCreditApproval();
      await orderConfPage.validatePendingOrderNumber();
      await orderConfPage.validateOrderConfirmationOrderSummary();
      await orderConfPage.validateOrderConfirmationShippingDetails();
      await orderConfPage.validateOrderConfirmationBillingAddress();
     // await orderConfPage.validateOrderConfirmationPayment();
      await orderConfPage.validateProductSection();
    });

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/GuestCheckout-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})