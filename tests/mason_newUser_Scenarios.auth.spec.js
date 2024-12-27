const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { SignInPage } from '../pages/mason_signin_page';
import { ResetPage } from '../pages/mason_reset_page';
import { CreateAccountPage } from '../pages/mason_createAccount_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { NewUserMyAccountPage } from '../pages/mason_newuser_myaccount_page';
import { MyAccountMakePaymentPage } from '../pages/mason_myAccountMakePayment_page';
import { allure } from 'allure-playwright';
import { sign } from 'crypto';
import { MyAccountWishListPage } from '../pages/mason_myAccountWishList_page';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const resetpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_reset_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const createAccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_createAccount_page_data.json')));
const newuser_myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_newcustomer_myaccount_page_data.json')));


test.describe("Mason New User Account Scenarios", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    try {
      await page.goto(process.env.WEB_URL);
      //await page.waitForLoadState('networkidle');
      if (isMobile == true) {
        const signinPage = new SignInPage(page);
        await signinPage.clickSignInImage();
        await signinPage.clickSignIn();
      } else {
        const homePage = new HomePage(page);
        await homePage.clickOnHomePageSignIn();

      }
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in test.beforeEach:", error);
    }

  })



  test("Validate the account Creation and navigation to DPQ from My Account > Get PreQualified Link ", async ({ page }) => {
    const signinPage = new SignInPage(page);
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
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const newuser_myaccountPage = new NewUserMyAccountPage(page);
    //checks for PreQualified Link and Learn More Link 
    //navigates to url(checks for expected url) and back
    await newuser_myaccountPage.validateNewUserStoneBerryCreditSection(newuser_myaccountpage_data.myaccount_sb_newuser_prequalifiedlinkname, newuser_myaccountpage_data.myaccount_sb_newuser_learnmorelinkname);

  })

  test("Validate My Credit page on entering valid customer account number and ssn/dob  ", async ({ page }) => {
    const signinPage = new SignInPage(page);
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
    const myaccountPage = new MyAccountPage(page);
    //await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountCreditLink();
    const newuser_myaccountPage = new NewUserMyAccountPage(page);
    await newuser_myaccountPage.navigatetoMyZBCreditNonCreditUser();
    await newuser_myaccountPage.validateCreditAccountVerificationDisplay();
    await newuser_myaccountPage.enterCustomerAccountNumber('057057776');
    await newuser_myaccountPage.selectSSNOption();
    await newuser_myaccountPage.enterSSNNumber('6617');
    await newuser_myaccountPage.clickOnContinueButton();
    await myaccountPage.validateMakeAPaymentAccountInformation();
    await myaccountPage.validateCreditStatementAddress();
    await myaccountPage.makeAPaymentButtonDisplay();

  })


  test("Validate Make a Payment page on entering valid customer account number and ssn/dob  ", async ({ page }) => {
    const signinPage = new SignInPage(page);
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
    const myaccountPage = new MyAccountPage(page);
    //await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickMyAccountMakeaPaymentLink();
    const newuser_myaccountPage = new NewUserMyAccountPage(page);
    await newuser_myaccountPage.navigatetoMakeAPaymentNonCreditUser();
    await newuser_myaccountPage.validateCreditAccountVerificationDisplay();
    await newuser_myaccountPage.enterCustomerAccountNumber('057057776');
    await newuser_myaccountPage.selectSSNOption();
    await newuser_myaccountPage.enterSSNNumber('6617');
    await newuser_myaccountPage.clickOnContinueButton();
    await myaccountPage.validateMakeaPaymentPage();
    const myaccountMakePaymentpage = new MyAccountMakePaymentPage(page);
    await myaccountMakePaymentpage.validateNewCreditCardRadioButton();
   // await myaccountMakePaymentpage.validateSavedCreditCardRadioButton();
    await myaccountMakePaymentpage.validatePaymentsection();
    await myaccountMakePaymentpage.validateOtherAmountisEditable();

  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/CreateAccount-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})