import test, { expect } from 'playwright/test';
import { faker } from '@faker-js/faker/locale/en';
const myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data =JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));


const addresses = [
    {
      streetAddress: '5396 N Reese Ave',
      city: 'Fresno',
      state: 'CA',
      zipCode: '93722-6112'
    },
    {
      streetAddress: '4439 Gale St',
      city: 'Livermore',
      state: 'CA',
      zipCode: '94550-8007'
    },
    {
      streetAddress: '2335 Orchard View Lane',
      city: 'Escondido',
      state: 'CA',
      zipCode: '92027-6735'
    }
   
  ];

exports.MasonCCPARequestPage = class MasonCCPARequestPage{
    constructor(page){
        this.page=page;
        this.makepayment_newaddress_fname = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_firstname);
        this.makepayment_newaddress_lname = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_lastname);
        this.makepayment_newaddress_address1 = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_addressline1);
       // this.makepayment_newaddress_address2 = page.getByRole('button', { name: address_line_2});
        this.makepayment_addnewaddress_city = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_city);
        this.makepayment_newAddress_state = page.getByLabel('*Statedropdown');
        this.makepayment_addnewaddress_zipcode = page.getByLabel(myaccountpage_locator.myaccount_addnewaddress_zipcode);
        
    }

    
    async clickOnCCPARequestLink(){
       // Define the locator for the link
      const linkLocator = this.page.locator('a:has-text("Do Not Sell My Personal Information")');

      // Wait for the link to be visible
      await linkLocator.waitFor({ state: 'visible' });

      // Scroll the element into view if it's not already in the viewport
      await linkLocator.scrollIntoViewIfNeeded();

      // Click the link
      await linkLocator.click();

      // Optionally, verify if the click worked by checking the URL
      await expect(this.page).toHaveURL(/\/ccparequest/);
    }

    async validateTheCCPARequestPage(){
        await (this.page.getByText('California Resident Information Request Form')).waitFor({state:'visible'});
        await expect(this.page.getByText('*Required fields')).toBeVisible();
    }

    async validateCCPARequestForm(){
        await (this.page.getByLabel('*First Name')).waitFor({state:'visible'});
        await expect(this.page.getByLabel('*Last Name')).toBeVisible();
        await expect(this.page.getByLabel('*Address Line')).toBeVisible();
        await expect(this.page.getByLabel('Show Address Line')).toBeVisible();
        await expect(this.page.getByLabel('*City')).toBeVisible();
        await expect(this.page.getByLabel('*City')).toBeVisible();
        await expect(this.page.getByLabel('*Statedropdown')).toBeVisible();
        await expect(this.page.getByLabel('*Zip Code')).toBeVisible();
        await expect(this.page.getByLabel('Customer Account Number')).toBeVisible();
        await expect(this.page.locator('select[name="requestPurpose"]')).toBeVisible();
        await expect(this.page.locator('section').filter({ hasText: /^Submit$/ })).toBeVisible();
        await expect(this.page.locator('#mainContent')).toContainText('Two-step verification is required. After successful form submission, please check your email to complete the process.');
        await expect(this.page.locator('section').filter({ hasText: /^-C2Help$/ }).getByLabel('Help information')).toBeVisible();
        await this.page.locator('section').filter({ hasText: /^-C2Help$/ }).getByLabel('Help information').click();
        await expect(this.page.getByText('Customer Account Number').nth(1)).toBeVisible();
        await expect(this.page.getByText('Your Customer Account Number').first()).toBeVisible();
        await expect(this.page.getByRole('img', { name: 'CatalogID' }).first()).toBeVisible();
        
    }

    

    async fillRequestForm(){
        await (this.page.getByText('California Resident Information Request Form')).waitFor({state:'visible'});
        const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
        const firstName = faker.person.firstName();
        await this.makepayment_newaddress_fname.fill(firstName);
        const lastName = faker.person.lastName();
        await (this.makepayment_newaddress_lname).fill(lastName);
    
        const address = faker.location.streetAddress();
        await (this.makepayment_newaddress_address1).fill(randomAddress.streetAddress);
    
        const city = faker.location.city();
        await (this.makepayment_addnewaddress_city).fill(randomAddress.city);
    
        const state = faker.location.state({ abbreviated: true });
        await (this.page.getByLabel('*Statedropdown')).selectOption(randomAddress.state);
    
        const zipCode = faker.location.zipCode().substring(0, 5); 
        await (this.makepayment_addnewaddress_zipcode).fill(randomAddress.zipCode);
    }


    async enterEmailAddress(){
      await this.page.getByLabel('*Email Address').click();
      await this.page.getByLabel('*Email Address').fill('test@test.com');
    }


    async selectPurposeOfRequest(){
       // Locate the <select> dropdown
       const selectLocator = this.page.locator('select#\\*Purpose\\ of\\ Request');

      // Get the list of all options (excluding the first one as it's the placeholder)
      const options = await selectLocator.locator('option:not([disabled])').allTextContents();

      // Filter out the placeholder text (if it exists) and then select a random option
      const validOptions = options.filter(option => option !== '*Purpose of Request');
      const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)];

      // Select the randomly chosen option
      await selectLocator.selectOption({ label: randomOption });

      // Get and log the selected option (using the label of the selected option)
      const selectedOption = await selectLocator.locator('option:checked').textContent();
      console.log(`Selected option: ${selectedOption.trim()}`);
    }

    async clickSubmitButton(){
      await this.page.getByRole('button', { name: 'Submit' }).click();
    }


    async validateSubmittedPage(){
      await (this.page.getByRole('button', { name: 'Continue Shopping' })).waitFor({state:'visible'});
      await expect(this.page.locator('#mainContent')).toContainText('California Resident Information Request Submitted');
      await expect(this.page.locator('#mainContent')).toContainText('Your information request has been submitted. You will receive a follow-up email which will require further action as part of our two-step verification on information requests.');
      
    }


    }