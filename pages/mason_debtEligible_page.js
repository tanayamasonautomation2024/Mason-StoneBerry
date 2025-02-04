import test, { expect } from 'playwright/test';
const newuser_myaccountpage_locator =JSON.parse(JSON.stringify(require('../object_repositories/mason_myaccount_page_repo.json')));


const not_found_text="We’re sorry, but we couldn’t find the page you’re looking for. Please check the address, or continue shopping.";
const continue_shopping_button='Continue Shopping'

exports.DebtEligiblePage = class DebtEligiblePage{
    constructor(page){
        this.page=page;
        this.not_found_header=page.getByRole('heading', { name: 'Page Not Found' });
        this.not_found_text=page.getByText(not_found_text);
      
        
    }

    async validateDebtProtectionSection(){
        //for already approved customers
        //wendellwrice@yahoo.mason.com
        await (this.page.getByRole('img', { name: 'Credit Logo' })).waitFor({state:'visible'});
        await (this.page.getByRole('heading', { name: 'You Are Now Protected By' })).waitFor({state:'visible'});
        await (this.page.getByRole('heading', { name: 'Stoneberry Payment Guardian™' })).waitFor({state:'visible'});
        await expect(this.page.getByRole('heading', { name: 'Your Stoneberry® Credit is' })).toBeVisible();
        await expect(this.page.locator('#mainContent')).toContainText('Your Stoneberry® Credit is protected during');
        await expect(this.page.getByRole('heading', { name: 'these qualifying life events:' })).toBeVisible();
        await expect(this.page.locator('section').filter({ hasText: /^View Stoneberry Payment Guardian™ Terms & Conditions$/ })).toBeVisible();
        await expect(this.page.getByText('Need to initiate a benefit,')).toBeVisible();
    }

    async validateDebtEligibleSection(){
        //for eligible but not yet approved customers
    }

}