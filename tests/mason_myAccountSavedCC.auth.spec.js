const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/mason_home_page';
import { SignInPage } from '../pages/mason_signin_page';
import { ResetPage } from '../pages/mason_reset_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { MyAccountSavedCCPage } from '../pages/mason_myAccountSavedCC_page';
import { allure } from 'allure-playwright';
import { sign } from 'crypto';
import fs from 'fs';
require('dotenv').config();
const creditUserFile = './credituser.json';
const nonCreditUserFile = './noncredituser.json';
const newUserFile = './newuser.json';
const paymentUserFile = './paymentuser.json';
const profileUserFile = './profileuser.json';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const resetpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_reset_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const savedAddress = myaccountpage_data.myaccount_newaddress_firstname + " " + myaccountpage_data.myaccount_newaddress_lastname + " " + myaccountpage_data.myaccount_newaddress_addressline1;
const editAddress = myaccountpage_data.myaccount_editaddress_firstname + " " + myaccountpage_data.myaccount_editaddress_lastname + " " + myaccountpage_data.myaccount_editaddress_addressline1;
let loginSuccessful = false;
test.describe("Mason MyAccount Saved Credit Card New User", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    const storageStatePath = isMobile ? profileUserFile : profileUserFile;

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


  //SB-MyA325
  test("Validate No Saved Card Message for new user", async ({ page }, testInfo) => {
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    const myAccountSavedCCPage = new MyAccountSavedCCPage(page);
    await myAccountSavedCCPage.clickSavedCreditCard();
    await myAccountSavedCCPage.noCardMessageForNewUser();

  })




})