const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { HomePageNew } from '../pages/mason_home_page1';
import { SignInPageNew } from '../pages/mason_signin_page1';
import { HomePage } from '../pages/mason_home_page';
import { MyAccountPage } from '../pages/mason_myaccount_page';
import { allure } from 'allure-playwright';
import fs from 'fs';
require('dotenv').config();
const creditUserFile = './clarkDPQUser.json';
const nonCreditUserFile = './noncredituser.json';
const newUserFile = './clarkDPQUser.json';
const profileUserFile = './profileuser.json';

const homepage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_home_page_data.json')));
const signinpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signin_page_data.json')));
const signoutpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_signout_page_data.json')));
const myaccountpage_data = JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));
const savedAddress = myaccountpage_data.myaccount_newaddress_firstname + " " + myaccountpage_data.myaccount_newaddress_lastname + " " + myaccountpage_data.myaccount_newaddress_addressline1;
const editAddress = myaccountpage_data.myaccount_editaddress_firstname + " " + myaccountpage_data.myaccount_editaddress_lastname + " " + myaccountpage_data.myaccount_editaddress_addressline1;
let loginSuccessful = false;
test.describe("Mason LoggedIn User HomePage", () => {

  test.beforeEach(async ({ page, isMobile }, testInfo) => {
    test.slow();
    const storageStatePath = isMobile ? creditUserFile : creditUserFile;

    if (fs.existsSync(storageStatePath)) {
      await page.context().addCookies(JSON.parse(fs.readFileSync(storageStatePath, 'utf-8')).cookies);
      loginSuccessful = true;
    } else {
      console.error("Login state is not available, skipping test.");
      test.skip('Skipping test because login state is not available');
    }

    try {
      await page.goto(process.env.WEB_URL);
      await page.waitForTimeout(3000);
    } catch (error) {
      console.error("Navigation failed:", error);
      test.skip('Skipping test because navigation failed');
    }
  })
  //Global Persistent Header (Logged In) - Promotional Banner Management-SB-GPH010
  test("GPH-Promotional Banner Managment - Verify the promotional banner should be displayed On Homepage", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePageNew(page);
    await homePage.clickSiteLogo();
    await homePage.displaySiteLogo();
    try {
      await homePage.displayHeroBanner(homepage_data.homepage_first_herobanner_name);
      //await homePage.displayBanner1(homepage_data.homepage_second_herobanner_name);
      //await homePage.displayBanner2(homepage_data.homepage_third_herobanner_name);

    } catch (error) {
      console.log("Error: There is No banner Present");
    }

  })

  //Global Persistent Header (Logged In) - Stoneberry Logo Redirect-SB-GPH012
  test("GPH-Stoneberry Logo Redirect - Verify the appearance and accesibility of the Stoneberry logo at the lefthand side", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePageNew(page);
    await homePage.staticPageNavigation(homepage_data.staticPageUrl);
    await homePage.clickSiteLogo();
    await homePage.displaySiteLogo();
    console.log(testInfo.status);

  })

  //Global Persistent Header (Logged In) - Sticky Header-SB-GPH002
  test("GPH-Sticky Header- Verify the header is sticky through the following pages: PDP", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePageNew(page);
    await homePage.staticPageNavigation(homepage_data.pdpURL);
    await homePage.pageScrollBy(homepage_data.scrollXAxis, homepage_data.scrollYAxis);
    await homePage.displayPDPStickyAddtoCartButton();
    console.log(testInfo.status);

  })

  //Global Persistent Header (Logged In) - Mega Menu Navigation-SB-GPH002
  test("GPH-Mega Menu Navigation - Verify Mega Menu Navigation opens on hovering within the CTA", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePage(page);
    await homePage.categoryL1ToBeVisibleOnDepartmentHover();
    await homePage.selectRandomSubCategory();

  })

  //Global Persistent Header (Logged In) - Search Bar-SB-GPH015/SB-GPH016/SB-GPH017
  test("GPH-Search Bar - Verify the search field appearance, help text display, and functionality", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePageNew(page);
    await homePage.displaySearchBar();
    await homePage.enterSearchTerm(homepage_data.searchterm);
    await homePage.hiddenSearchPlaceholderText();
    console.log(testInfo.status);

  })

  //Global Persistent Header (Logged In) - Account Drawer-SB-GPH039
  test("GPH-Account Drawer - Verify generation of the account drawer upon clicking the Account icon", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePageNew(page);
    await homePage.clickOnHomePageSignIn();
    const signinPage = new SignInPageNew(page);
    await signinPage.validateSignedInAccountDrawer();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.validatedSignedInAccountDrawerItems();
    console.log(testInfo.status);

  })

  //Global Persistent Header (Logged In) - Account State Update-SB-GPH038
  test("GPH-Account State Update - Verify the header update to display the logged-in user state, display of user's first name under the Account icon", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.redirectToMyAccount();
    await myaccountPage.validateAccountStatusUpdateText();
    console.log(testInfo.status);

  })

  //Global Persistent Header (Logged In) - Sign In/Sign Out-SB-GPH040
  test("GPH-Sign In/Sign Out - Verify the Test successful sign in/out functionality, display of success messages, redirection behavior upon sign out", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePageNew(page);
    await homePage.clickOnHomePageSignIn();
    const myaccountPage = new MyAccountPage(page);
    //await myaccountPage.redirectToMyAccount();
    await myaccountPage.clickSignOutButton();
    const signinPage = new SignInPageNew(page);
    await signinPage.validateSignOutMessage(signinpage_data.signout_success_text);
    //await signinPage.signoutPageHeaderTextValidation(signoutpage_data.signout_pageheadertext);
    // await signinPage.pageTextValidation(signoutpage_data.signout_pagetext1);
    // await signinPage.pageTextValidation(signoutpage_data.signout_pagetext2);
    // await signinPage.pageTextValidation(signoutpage_data.signout_pagetext3);
    // await signinPage.validateSignOutPageFormFields();
    // await signinPage.keepmeSignInCheckbox(signoutpage_data.signout_keepmesignincheckbox);
    //console.log(testInfo.status);

  })

  //Global Persistent Header (Logged In) - Cart Icon and Drawer-SB-GPH020
  test("GPH-Cart Icon and Drawer - Verify display and functionality of the Cart icon and drawer", async ({ page }, testInfo) => {
    //test.slow();
    if (!loginSuccessful) {
      test.skip('Skipping test due to failed login');
    }
    const homePage = new HomePageNew(page);
    await homePage.displayMiniCartIcon();
    await homePage.clickMiniCartIcon();
    await homePage.validatedEmptyMiniCartDrawer();
    await homePage.emptyMiniCartDrawerSection();
    console.log(testInfo.status);

  })

  test("HP-Global Credit Banner - Verify the display of Global Credit banner for a logged in credit user", async ({ page }, testInfo) => {
    //test.slow();
    const homePage = new HomePage(page);
    await homePage.validateGlobalCreditBannerForCreditUser();
  })

  test.afterEach(async ({ page }) => {
    try {
      const screenshotPath = `screenshots/LoggedHomepage-Screenshoot-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      allure.attachment('Full Page Screenshot', Buffer.from(await page.screenshot({ fullPage: true })), 'image/png');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

})