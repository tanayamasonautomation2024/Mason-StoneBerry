import test, { expect } from 'playwright/test';
import { faker } from '@faker-js/faker/locale/en';
const myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));
const accountpage_data =JSON.parse(JSON.stringify(require('../test_data/mason_sb_myaccount_page_data.json')));


const addresses = [
    {
      streetAddress: '100 Irish Ivy Ct',
      city: 'Boyd',
      state: 'TX',
      zipCode: '76023-4067'
    },
    {
      streetAddress: '11 Falmouth Pl',
      city: 'Albertson',
      state: 'NY',
      zipCode: '11507-2003'
    },
    {
      streetAddress: '138C Gg25 Rd',
      city: 'Fall River',
      state: 'KS',
      zipCode: '67047-4721'
    },
    {
      streetAddress: '7 Yo Yo Rd',
      city: 'Cana',
      state: 'VA',
      zipCode: '24317-3987'
    },
    {
      streetAddress: '2 JJ Rd',
      city: 'Charlotte',
      state: 'AR',
      zipCode: '72522-9645'
    },
    {
      streetAddress: '103 Nnptc Cir',
      city: 'Goose Creek',
      state: 'SC',
      zipCode: '29445-6324'
    }
  ];

exports.MasonCatalogRequestPage = class MasonCatalogRequestPage{
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

    
    async clickOnCatalogRequestLink(){
        await (this.page.getByRole('link', { name: 'Catalog Request' })).waitFor({state:'visible'});
        await this.page.getByRole('link', { name: 'Catalog Request' }).click();
    }

    async validateTheCatalogRequestPage(){
        await (this.page.getByRole('heading', { name: 'Request a Catalog' })).waitFor({state:'visible'});
        await expect(this.page.getByText('*Required fields')).toBeVisible();
        await expect(this.page.getByText('Enter your information below')).toBeVisible();
        await expect(this.page.locator('#mainContent')).toContainText('Enter your information below to receive a FREE Stoneberry catalog, and in the meantime, view our Online Catalog.');
        await expect(this.page.getByRole('link', { name: 'Online Catalog.' })).toBeVisible();
    }

    async validateCatalogRequestForm(){
        await expect(this.page.getByLabel('*First Name')).toBeVisible();
        await expect(this.page.getByLabel('*Last Name')).toBeVisible();
        await expect(this.page.getByPlaceholder('Start typing an address...')).toBeVisible();
        await expect(this.page.getByLabel('Show Address Line')).toBeVisible();
        await expect(this.page.getByLabel('*City')).toBeVisible();
        await expect(this.page.getByLabel('*City')).toBeVisible();
        await expect(this.page.getByLabel('*Statedropdown')).toBeVisible();
        await expect(this.page.getByLabel('*Zip Code')).toBeVisible();
    }

    async validateSignUpSection(){
        await expect(this.page.getByRole('heading', { name: 'Sign Up for Email' })).toBeVisible();
        await expect(this.page.getByText('Enter your email address')).toBeVisible();
        await expect(this.page.locator('#mainContent')).toContainText('Enter your email address below to also sign up for Stoneberry emails. You’ll receive exclusive promotions, and be the first to know about new items!');
        await expect(this.page.locator('[id="Email\\ Address\\ \\(optional\\)"]')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Request a Catalog' })).toBeVisible();
    }

    async fillRequestForm(){
        await (this.page.getByRole('heading', { name: 'Request a Catalog' })).waitFor({state:'visible'});
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
        await this.page.locator('[id="Email\\ Address\\ \\(optional\\)"]').click();
        await this.page.locator('[id="Email\\ Address\\ \\(optional\\)"]').fill('test@test.com');
    }

    async clickRequestCatalogButton(){
        await this.page.getByRole('button', { name: 'Request a Catalog' }).click();
    }


    async validateThankYouPage(){
        await (this.page.getByRole('heading', { name: 'Thank You!' })).waitFor({state:'visible'});
        await expect(this.page.getByText('Thank you for requesting a')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
        await expect(this.page.locator('#mainContent')).toContainText('Thank you for requesting a free catalog. You can expect to receive your new Stoneberry catalog shortly. In the meantime, view our Online Catalog, or shop our site to see every product in the catalog - and more!');
        await expect(this.page.getByRole('link', { name: 'Online Catalog,' })).toBeVisible();
    }


    }