import test, { expect } from 'playwright/test';
const newuser_myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));

const newuser_myaccount_paymentpage_breadcrumb="HomeMy AccountCredit Account";
const newuser_myaccount_paymentpage_pageheader="Credit Account Verification";
const newuser_myaccount_paymentpage_step1="Step 1";
const newuser_myaccount_paymentpage_customernumber_textbox="*Customer Account Number";
const newuser_myaccount_paymentpage_c2text="-C2";
const newuser_myaccount_paymentpage_step2="Step 2";
const newuser_myaccount_paymentpage_ssnradiobutton="Last four digits of social";
const newuser_myaccount_paymentpage_ssntextbox="*Last 4 of SSN";
const newuser_myaccount_paymentpage_dobradiobutton="Date of birth";
const newuser_myaccount_paymentpage_dobtextbox="*Date of Birth (MM/DD/YYYY)";
const newuser_myaccount_paymentpage_continuebutton="Continue";
const newuser_myaccount_orderspage_breadcrumb="HomeMy AccountOrders";
const newuser_myaccount_orderspage_headertext="Orders";
const newuser_myaccount_orderspage_norecentordertext="There are no recent orders in your account, but let’s see if we can find the order you’re looking for.";
const newuser_myaccount_addresspage_breadcrumb="HomeMy AccountAddresses";
const newuser_myaccount_addresspage_headertext="//section[@class='flex items-center gap-x-4']//h1[contains(text(),'Addresses')]";
const newuser_myaccount_addresspage_norecentaddresstext="There are currently no addresses saved to your account."
const newuser_myaccount_saveccpage_breadcrumb="HomeMy AccountSaved Credit";
const newuser_myaccount_saveccpage_headertext="//section[@class='flex items-center gap-x-4']//h1[contains(text(),'Saved Credit Cards')]";
const newuser_myaccount_saveccpage_norecentcctext="There are currently no cards saved to your account.";
const newuser_myaccount_saveccpage_addnewccbutton="(//button[contains(text(),'Add New Credit/Debit Card')])[1]";
const newuser_myaccount_saveccpage_addnewccbuttondd="(//button[contains(text(),'Add New Credit/Debit Card')])[2]";
const newuser_myaccount_saveccpage_savedefaultcccheckbox="(//button[@role='checkbox'])[1]";
const newuser_myaccount_saveccpage_savedefaultbillshipcheckbox="(//button[@role='checkbox'])[2]";
const newuser_myaccount_wishlistpage_breadcrumb="HomeMy AccountWishlist";
const newuser_myaccount_wishlistpage_headertext="Wish List";
const newuser_myaccount_wishlistpage_norecentcctext="There are currently no items saved to your wish list.";


exports.NewUserMyAccountPage = class NewUserMyAccountPage{
    constructor(page){
        this.page=page;
        this.newuser_myaccount_paymentpage_breadcrumb=page.locator('nav').filter({ hasText: newuser_myaccount_paymentpage_breadcrumb });
        this.newuser_myaccount_paymentpage_pageheader=page.getByRole('heading', { name: newuser_myaccount_paymentpage_pageheader });
        this.newuser_myaccount_paymentpage_step1=page.getByRole('heading', { name: newuser_myaccount_paymentpage_step1 });
        this.newuser_myaccount_paymentpage_customernumber_textbox=page.getByLabel(newuser_myaccount_paymentpage_customernumber_textbox);
        this.newuser_myaccount_paymentpage_c2text=page.getByText(newuser_myaccount_paymentpage_c2text);
        this.newuser_myaccount_paymentpage_step2=page.getByRole('heading', { name: newuser_myaccount_paymentpage_step2 });
        this.newuser_myaccount_paymentpage_ssnradiobutton=page.getByText(newuser_myaccount_paymentpage_ssnradiobutton);
        this.newuser_myaccount_paymentpage_ssntextbox=page.getByLabel(newuser_myaccount_paymentpage_ssntextbox);
        this.newuser_myaccount_paymentpage_dobradiobutton=page.getByText(newuser_myaccount_paymentpage_dobradiobutton, { exact: true });
        this.newuser_myaccount_paymentpage_dobtextbox=page.getByText(newuser_myaccount_paymentpage_dobtextbox);
        this.newuser_myaccount_paymentpage_continuebutton=page.getByRole('button', { name: newuser_myaccount_paymentpage_continuebutton });
        this.newuser_myaccount_orderspage_breadcrumb=page.getByText(newuser_myaccount_orderspage_breadcrumb);
        this.newuser_myaccount_orderspage_headertext=page.locator(`h1:has-text("${newuser_myaccount_orderspage_headertext}")`);
        this.newuser_myaccount_orderspage_norecentordertext=page.getByText(newuser_myaccount_orderspage_norecentordertext);
        this.newuser_myaccount_addresspage_breadcrumb=page.getByText(newuser_myaccount_addresspage_breadcrumb);
        this.newuser_myaccount_addresspage_headertext=page.locator(newuser_myaccount_addresspage_headertext);
        this.newuser_myaccount_addresspage_norecentaddresstext=page.getByText(newuser_myaccount_addresspage_norecentaddresstext);
        this.newuser_myaccount_saveccpage_breadcrumb=page.getByText(newuser_myaccount_saveccpage_breadcrumb);
        this.newuser_myaccount_saveccpage_headertext=page.locator(newuser_myaccount_saveccpage_headertext);
        this.newuser_myaccount_saveccpage_norecentcctext=page.getByText(newuser_myaccount_saveccpage_norecentcctext);
        this.newuser_myaccount_saveccpage_addnewccbutton=page.locator(newuser_myaccount_saveccpage_addnewccbutton);
        this.newuser_myaccount_saveccpage_addnewccbuttondd=page.locator(newuser_myaccount_saveccpage_addnewccbuttondd);
        this.newuser_myaccount_saveccpage_savedefaultcccheckbox=page.locator(newuser_myaccount_saveccpage_savedefaultcccheckbox);
        this.newuser_myaccount_saveccpage_savedefaultbillshipcheckbox=page.locator(newuser_myaccount_saveccpage_savedefaultbillshipcheckbox);
        this.newuser_myaccount_wishlistpage_breadcrumb=page.getByText(newuser_myaccount_wishlistpage_breadcrumb);
        this.newuser_myaccount_wishlistpage_headertext=page.locator(`h1:has-text("${newuser_myaccount_wishlistpage_headertext}")`);
        this.newuser_myaccount_wishlistpage_norecentcctext=page.getByText(newuser_myaccount_wishlistpage_norecentcctext);
        this.newuser_myaccount_wishlistpage_wishlistimgicon=page.locator('section').filter({ hasText: /^Wish List$/ }).locator('svg');
    }

    async validateNewUserStoneBerryCreditSection(firstLinkName,secondLinkName){
        // Wait for the logo to appear in the DOM
        const logoSelector = 'section.h-9.w-72 img[alt="Credit Logo"]';
        
        // Wait for the logo to be visible on the page
        await this.page.waitForSelector(logoSelector, { state: 'visible' });

        // Now select the logo element
        const logo = await this.page.$(logoSelector);

        // Verify that the logo element is not null
        expect(logo).not.toBeNull();   

        const logoSrc = await logo.getAttribute('src');
        expect(logoSrc).toContain('ZBSite-creditPaymentLogo');

        // Verify "Get Pre-Qualified" link display and redirection
        await this.page.waitForSelector('a[href="/credit-limit-prequalification"]', { visible: true });
        const getPreQualifiedLink = await this.page.$('a[href="/credit-limit-prequalification"]');
        expect(getPreQualifiedLink).not.toBeNull();

        const getPreQualifiedLinkText = await getPreQualifiedLink.innerText();
        expect(getPreQualifiedLinkText).toContain(firstLinkName);

        // Verify "Get Pre-Qualified" link redirection
        await getPreQualifiedLink.click();
        await this.page.waitForNavigation({ timeout: 15000 }); 
        //expect(this.page.url()).toContain('/credit-limit-prequalification/');
        //expect(this.page).toHaveURL(/.*credit-limit-prequalification/);
        const currentUrl = await this.page.url();
        expect(currentUrl).toContain('credit-limit-prequalification');

        // Navigate back to the original page
        await this.page.goBack();
        await this.page.waitForNavigation({ timeout: 15000 }); 
        // Verify "Learn More" button display and navigation
        await this.page.waitForSelector('button:has-text("' + secondLinkName + '")', { visible: true });
        const learnMoreButton = await this.page.$(`button:has-text("${secondLinkName}")`);
        expect(learnMoreButton).not.toBeNull();

        const learnMoreButtonText = await learnMoreButton.innerText();
        expect(learnMoreButtonText).toContain('Learn More');

        // Verify "Learn More" button navigation
        await learnMoreButton.click();
        await this.page.waitForNavigation({ timeout: 15000 }); 
        expect(this.page).toHaveURL(/.*buy-now-pay-later/);
    }

    async enterCustomerAccountNumber(enterCustomerAccountNumber){
        await this.newuser_myaccount_paymentpage_customernumber_textbox.fill(enterCustomerAccountNumber);
    }

    async selectSSNOption(){
        await this.newuser_myaccount_paymentpage_ssnradiobutton.click();
    }

    async enterSSNNumber(enterSSNNumber){
        await this.newuser_myaccount_paymentpage_ssntextbox.fill(enterSSNNumber);
    }

    async selectDateOfBirth(){
        await this.newuser_myaccount_paymentpage_dobradiobutton.click();
    }

    async enterDateOfBirth(enterDateOfBirth){
        await this.newuser_myaccount_paymentpage_dobtextbox.fill(enterDateOfBirth);
    }

    async clickOnContinueButton(){
        await this.newuser_myaccount_paymentpage_continuebutton.click();
    }

    async validateCreditAccountVerificationDisplay(){
        await (this.newuser_myaccount_paymentpage_breadcrumb).waitFor({state:'visible'});
        await (this.newuser_myaccount_paymentpage_pageheader).waitFor({state:'visible'});
        await (this.newuser_myaccount_paymentpage_step1).waitFor({state:'visible'});
        await (this.newuser_myaccount_paymentpage_customernumber_textbox).waitFor({state:'visible'});
        await (this.newuser_myaccount_paymentpage_c2text).waitFor({state:'visible'});
        await (this.newuser_myaccount_paymentpage_step2).waitFor({state:'visible'});
        await (this.newuser_myaccount_paymentpage_ssnradiobutton).waitFor({state:'visible'});
        await (this.newuser_myaccount_paymentpage_dobradiobutton).waitFor({state:'visible'});
        await (this.newuser_myaccount_paymentpage_continuebutton).waitFor({state:'visible'});
    }

    async navigatetoMakeAPaymentNonCreditUser(){
        await this.page.waitForURL(/.*\/account\/creditaccountverification\?destination=payment/, {
            timeout: 90000  // Timeout set to 90 seconds
          });
        await this.newuser_myaccount_paymentpage_pageheader.waitFor({ state: 'visible' });

    }

    async navigatetoMyZBCreditNonCreditUser(){
        await this.page.waitForURL(/.*\/account\/creditaccountverification\?destination=credit/, {
            timeout: 90000  // Timeout set to 90 seconds
          });
        await this.newuser_myaccount_paymentpage_pageheader.waitFor({ state: 'visible' });

    }

    async clickOnTooltip(){
        await this.page.locator("//button[@aria-label='Help information']").click();
        const tooltipLocator = this.page.locator('button[data-state="instant-open"][aria-label="Help information"]');
        // Wait for the tooltip to appear
        await tooltipLocator.waitFor();
        await expect(tooltipLocator).toBeVisible();
    }

    async validateNoRecentOrdersSection(){
        await (this.newuser_myaccount_orderspage_breadcrumb).waitFor({state:'visible'});
        await expect(this.newuser_myaccount_orderspage_headertext).toBeVisible();
        await (this.newuser_myaccount_orderspage_norecentordertext).waitFor({state:'visible'});
    }

    async validateNoRecentAddressesSection(){
        await (this.newuser_myaccount_addresspage_breadcrumb).waitFor({state:'visible'});
        await (this.newuser_myaccount_addresspage_headertext).waitFor({state:'visible'});
        await (this.newuser_myaccount_addresspage_norecentaddresstext).waitFor({state:'visible'});
    }

    async validateNoSavedCCSection(){
        await (this.newuser_myaccount_saveccpage_breadcrumb).waitFor({state:'visible'});
        await (this.newuser_myaccount_saveccpage_headertext).waitFor({state:'visible'});
        await (this.newuser_myaccount_saveccpage_norecentcctext).waitFor({state:'visible'});
        await (this.newuser_myaccount_saveccpage_addnewccbutton).waitFor({state:'visible'});
        await (this.newuser_myaccount_saveccpage_addnewccbuttondd).waitFor({state:'visible'});
    }

    async clickAddNewCCButton(){
        await this.newuser_myaccount_saveccpage_addnewccbuttondd.click();
    }

    async defaultSaveCCCheckboxDisplay(){
        await expect(this.newuser_myaccount_saveccpage_savedefaultcccheckbox).toBeVisible();
    }

    async defaultSaveCCBillShipAddressCheckboxDisplay(){
        await expect(this.newuser_myaccount_saveccpage_savedefaultbillshipcheckbox).toBeVisible();
    }

    async validateNoWishlistSection(){
        await (this.newuser_myaccount_wishlistpage_breadcrumb).waitFor({state:'visible'});
        await (this.newuser_myaccount_wishlistpage_headertext).waitFor({state:'visible'});
        await (this.newuser_myaccount_wishlistpage_norecentcctext).waitFor({state:'visible'});
        await (this.newuser_myaccount_wishlistpage_wishlistimgicon).waitFor({state:'visible'});
    }

    async redirectToMyAccount() {
        await this.page.locator("//img[@alt='My Account']").click();
        await this.page.getByRole('link', { name: 'My Account' }).click({});
        await this.page.waitForSelector('h1.ml-2\\.5');
        await expect(this.page.getByRole('heading', { name: 'My Account' })).toBeVisible();
    }

}
