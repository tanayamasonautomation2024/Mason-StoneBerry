import test, { expect } from 'playwright/test';
const homepage_locator = JSON.parse(JSON.stringify(require('../object_repositories/mason_home_page_repo.json')));
const expectedCategories = [
    'Furniture',
    'Health + Beauty',
    'Clothing, Shoes + Bags',
    'Bed + Bath',
    'Kitchen + Dining'
];
const sign_up_iframe = 'iframe[title="\\34  - ZB - DTM - Footer - 01 Email Sign Up"]';
const sign_up_text1 = "Sign Up for 15% Off Your";
const sign_up_text2 = "Sign up for Stoneberry emails";
const sign_up_email_textbox = "Enter your email address";
const sign_up_submit = "Submit Modal Form";
const sign_up_iframe2 = 'iframe[title="\\33  - ZB - DTM - Pop Up - 02 Text Sign Up - 03 Thank You"]';

exports.HomePageNew = class HomePageNew {
    constructor(page) {
        this.page = page;
        this.homepage_searchbarplaceholder = page.getByPlaceholder(homepage_locator.homepage_searchbarplaceholder);
        this.homepage_searchbutton = page.getByLabel(homepage_locator.homepage_searchbutton, { exact: true });
        //this.homepage_signin=page.getByRole('button', { name: homepage_locator.homepage_signin,exact:true });
        this.homepage_signin = page.locator(homepage_locator.homepage_signin);
        //this.homepage_cart=page.getByRole('button', { name: homepage_locator.homepage_cart }); 
        this.homepage_cart = page.locator('img[alt="Mini Cart"]');
        this.homepage_category = page.getByRole('button', { name: homepage_locator.homepage_category });
        this.minicart_drawer_heading = page.getByRole('button', { name: homepage_locator.minicart_drawer_heading });
        this.minicart_drawer_subtotalsection = page.getByText(homepage_locator.minicart_drawer_subtotalsection);
        this.minicart_drawer_viewcart_button = page.getByRole('button', { name: homepage_locator.minicart_drawer_viewcart_button });
        this.minicart_drawer_checkout_button = page.getByRole('button', { name: homepage_locator.minicart_drawer_checkout_button });
        this.footer_signupemail_textbox = page.getByPlaceholder(homepage_locator.footer_signupemail_textbox);
        this.footer_signup_button = page.getByRole('button', { name: homepage_locator.footer_signup_button });
        this.StoneberryLogo = page.locator('a[title="Stoneberry"] img[alt="Stoneberry"]');

        this.videoBanner = page.locator('div[id="player"]');
        this.minicartContinueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.minicartSignInButton = page.getByRole('button', { name: 'Sign In', exact: true });
        this.miniCartEmptyCartMessage = page.getByText('Your shopping cart is empty.');
        this.miniCartEmptyGuestUser = page.getByRole('button', { name: 'Have an account? Sign in' });

    }

    async displaySearchBar() {
        await this.homepage_searchbarplaceholder.waitFor({ state: 'visible' });
        await this.homepage_searchbutton.waitFor({ state: 'visible' });
        await expect(this.homepage_searchbarplaceholder).toBeVisible();
        await expect(this.homepage_searchbutton).toBeVisible();
    }

    async displaySignIn() {
        await this.homepage_signin.waitFor({ state: 'visible' });
        await expect(this.homepage_signin).toBeVisible();
    }

    async displayMiniCartIcon() {
        await this.homepage_cart.waitFor({ state: 'visible' });
        await expect(this.homepage_cart).toBeVisible();
    }

    async clickMiniCartIcon() {
        await this.homepage_cart.waitFor({ state: 'visible' });
        await this.homepage_cart.click();
    }

    async displayCategory() {
        await this.homepage_category.waitFor({ state: 'visible' });
        await expect(this.homepage_category).toBeVisible();
    }
    async displaySiteLogo() {
        await expect(this.StoneberryLogo).toBeVisible();
    }

    async clickSiteLogo() {
        //await this.page.getByRole('link', { name: brandLogoName, exact: true }).click();
        await this.StoneberryLogo.click();
        //await this.page.waitForNavigation();

    }

    async homePageRedirectionValidation(homePageUrl) {
        await expect(this.page).toHaveURL(homePageUrl);
    }
    async displayHeroBanner(bannerName) {
        // Scroll "Top Categories" into view if needed
        await this.page.getByText('Top Categories').scrollIntoViewIfNeeded();
    
        // Scroll the banner name into view if needed
        await this.page.getByRole('link', { name: bannerName }).scrollIntoViewIfNeeded();

        await this.page.waitForTimeout(2000);
        
        // Wait for the banner link to be visible
        await this.page.getByRole('link', { name: bannerName }).waitFor({ state: 'visible' });
    
        // Ensure the banner image is visible
        await (this.page.locator(`a img[alt="${bannerName}"]`)).waitFor({ state: 'visible' });
    }

    async displayClearanceBanner(bannerName) {
        // Scroll "Top Categories" into view if needed
        await this.page.getByText('Top Brands').scrollIntoViewIfNeeded();
    
        // Target the image using alt text
        const bannerImage = await this.page.locator(`img[alt="${bannerName}"]`);
    
        // Gradually scroll until the image becomes visible
        let isVisible = false;
        while (!isVisible) {
            await bannerImage.scrollIntoViewIfNeeded();
            
            // Wait for a short delay before checking visibility
            await this.page.waitForTimeout(1000); // Adjust time to make scrolling slower/faster
            
            // Check if the image is visible
            isVisible = await bannerImage.isVisible();
        }
    
        // Wait for the image to be fully visible
        await bannerImage.waitFor({ state: 'visible' });
    
        // Optionally, wait for a short timeout after scrolling
        await this.page.waitForTimeout(2000);
    }
    

    async displayBanner2(bannerName) {
        //await this.page.locator('section.seasonalSavings section.auc-Recommend').first().scrollIntoViewIfNeeded();
        await this.page.getByText('Top Brands').scrollIntoViewIfNeeded();
        await this.page.getByRole('link', { name: bannerName }).waitFor({ state: 'visible' });
        await expect(this.page.locator(`a img[alt="${bannerName}"]`).first()).toBeVisible();

    }

    async displayBanner1(bannerName) {
        await this.page.getByText('Top Categories').scrollIntoViewIfNeeded();
        await this.page.getByRole('link', { name: bannerName }).waitFor({ state: 'visible' });
        await expect(this.page.locator(`a img[alt="${bannerName}"]`).first()).toBeVisible();

    }
    async displayPromotionalBanner(promotionalBannerContent) {
        await expect(this.page.getByRole('banner').locator('div').filter({ hasText: promotionalBannerContent }).nth(2)).toBeVisible();
    }

    async displayGlobalBanner(bannerText) {
        await expect(this.page.locator('div').filter({ hasText: new RegExp("^" + bannerText + "$") }).first()).toBeVisible();

    }

    async displayFooter(footerName) {
        await expect(this.page.getByText(footerName, { exact: true })).toBeVisible();
    }

    async displayFooterLinks(footerLinkName) {
        await expect(this.page.getByRole('link', { name: footerLinkName, exact: true })).toBeVisible();
    }

    async clickOnHomePageSignIn() {
        await this.homepage_signin.click();
    }

    async closeSignedInDrawer() {
        await this.page.getByRole('button').nth(1).click();
    }

    async staticPageNavigation(staticPageUrl) {
        await this.page.goto(staticPageUrl);
        await this.page.waitForLoadState('networkidle');
    }

    async pageScrollBy(deltaX, deltaY) {
        await this.page.mouse.wheel(deltaX, deltaY);

    }

    async displayPDPStickyAddtoCartButton() {
        await this.page.waitForSelector('section.grid.w-3\\/4.grid-cols-2');
        await expect(this.page.locator('section.grid.w-3\\/4.grid-cols-2')).toBeVisible();
        //await expect(this.page.locator(homepage_locator.stickyheader_pdp)).toBeAttached();
    }

    async mouseHoverMegaMenu(categoryNameL1) {
        await this.homepage_category.hover();
        await this.page.getByText(categoryNameL1).first().hover();
        await expect(this.page.getByText(categoryNameL1).first()).toBeVisible();
    }

    async clickOnMegaMenuL2Category(l2CategoryName) {
        //await this.page.getByLabel('Main Menu').locator('div').filter({ hasText: 'Womens ClothingAll Womens' })
        await this.page.getByRole('link', { name: l2CategoryName }).first().click();
        await this.page.waitForNavigation();
        await this.page.locator('section.plpGrid').waitFor({ state: 'visible' });
    }

    async validateCLPNavigationUrl(clpUrl) {
        const expectedURL = new RegExp(/.*\/(categories)\/[^\/]+/);
        await expect(this.page).toHaveURL(expectedURL);

    }

    async enterSearchTerm(searchTerm) {
        await this.homepage_searchbarplaceholder.fill(searchTerm);
        await this.page.waitForTimeout(500);
    }

    async hiddenSearchPlaceholderText() {
        await expect(this.page.getByLabel('Search', { exact: true })).toBeEnabled();
    }

    async emptyMiniCartDrawerSection() {
        await expect(this.page.getByRole('button', { name: 'My Cart' })).toBeVisible();
    }

    async validatedEmptyMiniCartDrawer() {
        await expect(this.minicart_drawer_heading).toBeVisible();
        await expect(this.minicart_drawer_viewcart_button).toBeVisible();
        await expect(this.minicartContinueShoppingButton).toBeVisible();
        await expect(this.miniCartEmptyCartMessage).toBeVisible();
    }

    async validatedEmptyMiniCartDrawerGuest() {
        await expect(this.minicart_drawer_heading).toBeVisible();
        await expect(this.minicart_drawer_viewcart_button).toBeVisible();
        await expect(this.minicartSignInButton).toBeVisible();
        await expect(this.miniCartEmptyCartMessage).toBeVisible();
        await expect(this.miniCartEmptyGuestUser).toBeVisible();
    }

    async enterFooterEmailNewsLetter(newsLetterEmail) {
        await this.footer_signupemail_textbox.fill(newsLetterEmail);
    }

    async displayFooterEmailNewsLetter() {
        await expect(this.footer_signupemail_textbox).toBeVisible();
    }

    async displayFooterSignUpButton() {
        const isVisible = await this.footer_signup_button.isVisible();
        
        if (isVisible) {
            console.log("Footer sign-up button is visible.");
        } else {
            console.log("Footer sign-up button is NOT visible.");
        }
    }
    
    async clickFooterSignUpButton() {
        const isVisible = await this.footer_signup_button.isVisible();
    
        if (isVisible) {
            await this.footer_signup_button.click();
            console.log("Footer sign-up button clicked.");
        } else {
            console.log("Cannot click footer sign-up button because it is not visible.");
        }
    }
    

    async validateFooterNewsLetterSignUpContentOld(newsletterSignUpContent) {
        // Scroll to the bottom of the page
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    
        // Wait for the page to load dynamically (if needed)
        await this.page.waitForTimeout(2000); // Optional: Adjust timeout as needed for dynamic loading
    
        // Locate the newsletter sign-up content and scroll it into view
        const locator = this.page.locator('text=' + newsletterSignUpContent);
        await locator.scrollIntoViewIfNeeded();
    
        // Wait for the newsletter content to be visible (allow some time for dynamic loading)
        await locator.waitFor({ state: 'visible', timeout: 5000 });
    
        // Check if the content is visible
        const isVisible = await locator.isVisible();
    
        if (isVisible) {
            console.log(`Newsletter sign-up content "${newsletterSignUpContent}" is visible.`);
        } else {
            console.log(`Newsletter sign-up content "${newsletterSignUpContent}" is NOT visible or not present.`);
        }
    }

    async validateFooterNewsLetterSignUpContent() {
        // Scroll to the bottom of the page
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    
        // Wait for the page to load dynamically (if needed)
        await this.page.waitForTimeout(2000); // Optional: Adjust timeout as needed for dynamic loading
        await (this.page.locator(sign_up_iframe).contentFrame().getByText(sign_up_text1)).waitFor({state:'visible'});
        await this.page.locator(sign_up_iframe).contentFrame().getByText(sign_up_text2).waitFor({state:'visible'});
        await (this.page.locator(sign_up_iframe).contentFrame().getByPlaceholder(sign_up_email_textbox)).waitFor({state:'visible'});
        await this.page.locator(sign_up_iframe).contentFrame().getByLabel(sign_up_submit).waitFor({state:'visible'});
    }
    
    
    async validateFooterNewsLetterSignUpOld(email) {
        // Wait for the iframe to be visible and load the content frame
        const iframe = this.page.locator(sign_up_iframe);
        await iframe.waitFor({ state: 'visible', timeout: 30000 }); // Wait for iframe to be visible (adjust timeout if necessary)
    
        // Get the content of the iframe
        const contentFrame = await iframe.contentFrame();
    
        // Wait for the email input field to be visible
        const emailInput = iframe.locator('#form_input_email');
        await emailInput.waitFor({ state: 'visible', timeout: 30000 }); // Wait for email input to be visible
    
        // Click on the email input field and fill the email
        await emailInput.fill(email);
        //await emailInput.type(email, { delay: 100 });
    
        // Wait for the submit button to be visible
        const submitButton = contentFrame.locator(`[aria-label="${sign_up_submit}"]`);
        await submitButton.waitFor({ state: 'visible', timeout: 30000 }); // Wait for the submit button to be visible
    
        // Click the submit button to submit the form
        await submitButton.click();
    
        console.log(`Newsletter sign-up form submitted with email: ${email}`);
    }

    async validateFooterNewsLetterSignUp(email) {

        await this.page.locator(sign_up_iframe).contentFrame().getByPlaceholder(sign_up_email_textbox).click();
        await this.page.locator(sign_up_iframe).contentFrame().getByLabel(sign_up_email_textbox).fill(email);
        await this.page.locator(sign_up_iframe).contentFrame().getByLabel(sign_up_submit).click();
    }
    

    async validateOtherSitesLinks(otherSitesLinkName) {
        await expect(this.page.getByRole('link', { name: otherSitesLinkName, exact: true })).toBeVisible();

    }

    async validateOtherSitesSection(otherSitesSectionLabelName) {
        await expect(this.page.locator('ul').filter({ hasText: otherSitesSectionLabelName })).toBeVisible();

    }

    async clickFooterLink(footerLinkName) {
        await this.page.getByRole('link', { name: footerLinkName, exact: true }).click();
    }

    async validateCopyRightSection(copyrightText, contactNumber, contactUsLinkName) {
        await (this.page.getByText(copyrightText)).waitFor({state:'visible'});
        await expect(this.page.getByRole('link', { name: contactNumber })).toBeVisible();
        await expect(this.page.getByRole('link', { name: contactUsLinkName }).nth(1)).toBeVisible();
    }

    async validateCopyrightLegalText(copyrightLegalText) {
        await expect(this.page.getByText(copyrightLegalText)).toBeVisible();
    }

    async getCategoryImageTilesCount() {
        await this.page.locator('(//div[@class=" block md:block lg:block"]/section/ul)[1]//li').first().waitFor({ state: 'visible' });
        const gridItems = this.page.locator('(//div[@class=" block md:block lg:block"]/section/ul)[1]//li');
        // Get the count of grid items
        const itemCount = await gridItems.count();
        // Assert that the count is either 4 or 6
        expect(itemCount).toBeGreaterThanOrEqual(4);
        expect(itemCount).toBeLessThanOrEqual(6);
    }

    async validateCategoryProductImages() {
        await this.page.getByText('Top Categories').scrollIntoViewIfNeeded();
        // Wait for the list to be visible
       const listSelector = 'ul.grid.grid-cols-2.gap-5.md\\:grid-cols-4';
      // const listSelector = 'ul.grid.gap-y-5.md\\:gap-y-10.gap-x-4.md\\:gap-x-6';
        await this.page.waitForSelector(listSelector);

        // Get all list items
        //const listItems = this.page.locator(`${listSelector}:nth-of-type(1) > li`);

        const firstList = this.page.locator(listSelector).first();

    // Get the count of list items inside the first <ul>
    const itemCount = await firstList.locator('> li').count();

        // Get the count of list items
        //const itemCount = await listItems.count();
        console.log(itemCount);

        // Validate each item
        for (let i = 0; i < itemCount; i++) {
           // const listItem = listItems.nth(i);
           const listItem = firstList.locator('> li').nth(i);

            // Check if the image is present and has a valid src attribute
            const image = listItem.locator('img');
            await expect(image).toBeTruthy();
            //await expect(image).toHaveAttribute('src', /https:\/\/images\.contentstack\.io\/v3\/assets\/.*/);

            // Check if the name is present and visible
            const name = listItem.locator('p');
            await expect(name).toBeVisible();
            const nameText = await name.textContent();
            expect(nameText.trim().length).toBeGreaterThan(0); // Ensure name is not empty

            console.log(`Item ${i + 1}: Image and name "${nameText.trim()}" are valid.`);
        }

    }

    async getTopCategoryImageTilesCount() {
        // Get line count inside grid elements
        await this.page.getByText('Top Categories').scrollIntoViewIfNeeded();
        await this.page.locator('section.topcategory ul li').first().waitFor({ state: 'visible' });
        await expect(this.page.locator('section.topcategory ul li')).toHaveCount(18);
    }

    async categoryImageDisplayValidation(imageAltText) {
        await expect(this.page.getByAltText(imageAltText).first()).toBeVisible();
    }

    async categoryLinkValidation(catLinkName) {
        await expect(this.page.getByRole('link', { name: catLinkName }).first()).toBeVisible();
    }

    async topCategoriesImageDisplayValidation() {
        // Define the CSS selector for the grid container
        const gridSelector = 'section.topcategory ul li';

        // Get all the grid items
        const gridItems = await this.page.$$(gridSelector);

        // Loop through each grid item
        for (const item of gridItems) {
            // Get the link element inside the grid item
            const linkElement = await item.$('a');

            // Get the text content of the link element
            const linkText = await linkElement.textContent();

            // Validate the link text
            if (linkText.trim() === "") {
                console.error('Link text is empty');
            } else {
                console.log('Link text is correct:', linkText.trim());
            }

            // Get the image element inside the link element
            const imageElement = await linkElement.$('img');

            // Validate if image element exists
            if (!imageElement) {
                console.error('Image element not found');
            } else {
                // Validate if image is visible
                const isVisible = await imageElement.isVisible();
                console.log('Is image visible:', isVisible);

                // Validate the alt attribute of the image
                const altText = await imageElement.getAttribute('alt');
                if (altText === "") {
                    console.error('Alt text is empty');
                } else {
                    console.log('Alt text is correct:', altText);
                }
            }
        }
    }

    async getTopBrandsImageTilesCount() {
        await this.page.locator('h4:has-text("Top Brands")').first().scrollIntoViewIfNeeded();
        await this.page.locator('section:has-text("Top Brands") + ul li').first().waitFor({ state: 'visible' });
        const count = await this.page.locator('section:has-text("Top Brands") + ul li').count();
        expect(count).toBeGreaterThan(0);

    }

    async getBrandsImageTilesCount() {
        await this.page.locator('h4:has-text("Top Brands")').first().scrollIntoViewIfNeeded();
        await expect(this.page.locator('section.mx-auto.mt-5.max-w-screen-9xl.px-4.md\\:mt-9 ul li')).toHaveCount(6);

    }

    async validateTopBrands() {
        // Select the Top Brands section
        await this.page.locator('h4:has-text("Top Brands")').first().scrollIntoViewIfNeeded();
        const topBrandsSection = await this.page.locator('section:has-text("Top Brands") + ul li');
        const count = await this.page.locator('section:has-text("Top Brands") + ul li').count();
        expect(count).toBeGreaterThan(0);
        //await expect(topBrandsSection).toHaveCount(4);
        // Validate product count

        const productCount = await topBrandsSection.count();
        expect(productCount).toBeGreaterThan(0); // Replace 4 with the expected number of products

        // Validate each product
        for (let i = 0; i < productCount; i++) {
            const product = topBrandsSection.nth(i);

            // Scroll product into view
            await product.scrollIntoViewIfNeeded();

            // Validate image display
            const image = product.locator('img');
            await expect(image).toBeVisible();

            // Validate link
            const link = product.locator('a');
            await expect(link).toHaveAttribute('href', /\/(brands|categories)\//);

            // Validate product name (using aria-label for this case)
            const productName = await link.getAttribute('title');
            expect(productName).not.toBeNull();
            expect(productName).not.toBe('');
        }
    }

    async brandsImageDisplayValidation() {
        // Scroll to the section containing the images
        await this.page.locator('h4:has-text("Top Brands")').first().scrollIntoViewIfNeeded();
        const imageSection = await this.page.locator('section.mx-auto.mt-5.max-w-screen-9xl.px-4.md\\:mt-9 ul li img');

        // Validate the number of images
        await expect(imageSection).toHaveCount(6); // Replace 6 with the expected number of images

        // Wait for the images to be visible and validate their attributes
        const imageCount = await imageSection.count();
        console.log(imageCount);

        for (let i = 0; i < imageCount; i++) {
            const image = imageSection.nth(i);

            // Scroll image into view
            await image.scrollIntoViewIfNeeded();

            // Validate image is visible
            await expect(image).toBeVisible();

            // Validate image has a src attribute
            const src = await image.getAttribute('src');
            expect(src).not.toBeNull();
            expect(src).not.toBe('');

            // Validate image has an alt attribute
            const alt = await image.getAttribute('alt');
            expect(alt).not.toBeNull();
            expect(alt).not.toBe('');
        }
    }

    async validateSeasonalSavingsOld() {
        // Scroll to the carousel section
        //await this.page.locator('section.seasonalSavings section.auc-Recommend').first().scrollIntoViewIfNeeded();
        await this.page.getByText('Top Brands').scrollIntoViewIfNeeded();
        await this.page.locator('section:has-text("Seasonal Savings")').scrollIntoViewIfNeeded();
        await this.page.getByText('Seasonal Savings').waitFor({ state: 'visible', timeout: 120000 });


        // Select the product items within the carousel
        const productItems = this.page.locator('section.auc-Recommend .swiper-slide');
        const productCount = await productItems.count();
        console.log(`Number of products: ${productCount}`);

        // Validate the number of products (adjust the expected number as needed)
        await expect(productItems).toHaveCount(productCount); // Replace productCount with the expected number if known

        for (let i = 0; i < productCount; i++) {
            const product = productItems.nth(i);

            // Scroll product into view
            await product.scrollIntoViewIfNeeded();

            // Validate product image
            const productImage = product.locator('a > img');
            await expect(productImage).toBeVisible();
            const src = await productImage.getAttribute('src');
            expect(src).not.toBeNull();
            expect(src).not.toBe('');

            // Validate product name
            const productName = product.locator('a > p');
            await expect(productName).toBeVisible();
            const nameText = await productName.textContent();
            expect(nameText).not.toBeNull();
            expect(nameText).not.toBe('');

            // Validate price
            const price = product.locator('div.mt-3.min-h-\\[50px\\] > section > strong');
            await expect(price).toBeVisible();
            const priceText = await price.textContent();
            expect(priceText).not.toBeNull();
            expect(priceText).not.toBe('');
        }

        // Validate the carousel button
        const carouselButton = this.page.locator('section.auc-Recommend .swiper-button-next'); // Assuming there is a next button
        await expect(carouselButton).toBeVisible();
        await carouselButton.click();

    }

    async slowlyScrollToElement(locator) {
        const scrollStep = 300; // Pixels to scroll per step
        const timeout = 120000; // Maximum time to wait (in ms)
        const checkInterval = 1000; // Time between each check (in ms)
    
        const startTime = Date.now();
        
        while (Date.now() - startTime < timeout) {
            // Scroll the page by a small amount
            await this.page.evaluate((scrollStep) => {
                window.scrollBy(0, scrollStep);
            }, scrollStep);
    
            // Wait for a short interval before checking again
            await this.page.waitForTimeout(checkInterval);
    
            // Check if the element is visible
            const isVisible = await locator.isVisible();
            if (isVisible) {
                console.log("Element is visible!");
                return;
            }
        }
        throw new Error("Timed out waiting for the element to become visible.");
    }
    
    async validateSeasonalSavings() {
        // Locate the 'Seasonal Savings' section
        const seasonalSavingsLocator = this.page.locator('section#seasonalSavings');
    
        // Call the slowly scroll function to make the section visible
        await this.slowlyScrollToElement(seasonalSavingsLocator);
        
        // Once the section is visible, proceed with further validation
        await seasonalSavingsLocator.scrollIntoViewIfNeeded();

        const swiperElement = this.page.locator('div.swiper.swiper-initialized.swiper-horizontal.swiper-pointer-events.swiper-free-mode.mySwiper.multiSlide.homePageSwiper');
        //const swiperElement = seasonalSavingsLocator.locator('div.swiper-button-next');
        await swiperElement.waitFor({ state: 'attached' });
        await swiperElement.waitFor({ state: 'visible' });
        
        // Validate the product items, image, name, and price as before
        const productItems = this.page.locator('div.swiper.swiper-initialized.swiper-horizontal.swiper-pointer-events.swiper-free-mode.mySwiper.multiSlide.homePageSwiper');
        const productCount = await productItems.locator('a > img').count();
        console.log(`Number of products: ${productCount}`);
        
        for (let i = 0; i < productCount; i++) {
           // const product = productItems.nth(i);
            
           // await product.scrollIntoViewIfNeeded();
            
            // Validate product image
            const productImage = productItems.locator('a > img').nth(i);
            await expect(productImage).toBeVisible();
            const src = await productImage.getAttribute('src');
            expect(src).not.toBeNull();
            expect(src).not.toBe('');
            
            // Validate product name
            const productName = productItems.locator('a > h3').nth(i);
            await expect(productName).toBeVisible();
            const nameText = await productName.textContent();
            expect(nameText).not.toBeNull();
            expect(nameText).not.toBe('');
            
            // Validate price
            const price = productItems.locator('div.min-h-\\[26px\\] > p > span').nth(i);
            await expect(price).toBeVisible();
            const priceText = await price.textContent();
            expect(priceText).not.toBeNull();
            expect(priceText).not.toBe('');
        }
        
        if (productCount > 4) {
            const carouselButton = swiperElement.locator('div.swiper-button-next');
            await expect(carouselButton).toBeVisible();
            await carouselButton.click();
        }
    }
    


    async signUpModalDisplayValidation() {
        await expect(this.page.locator(sign_up_iframe2).contentFrame().getByText('THANK YOU FOR SIGNING UP!')).toBeVisible();
        await this.page.locator(sign_up_iframe2).contentFrame().getByText('Unlock Even').click();
        await expect(this.page.locator(sign_up_iframe2).contentFrame().getByText('More Savings!')).toBeVisible();
        await this.page.locator(sign_up_iframe2).contentFrame().getByText('Enter your mobile number and').click();
        await expect(this.page.locator(sign_up_iframe2).contentFrame().getByPlaceholder('Enter your mobile number')).toBeVisible();
        await this.page.locator(sign_up_iframe2).contentFrame().getByText('Yes, please text me about new').click();
        await expect(this.page.locator(sign_up_iframe2).contentFrame().getByLabel('Submit Modal Form')).toBeVisible();
        await expect(this.page.locator(sign_up_iframe2).contentFrame().getByLabel('Submit Modal Form')).toContainText('Sign Up For Texts ▸');
        await expect(this.page.getByLabel('Close Modal')).toBeVisible();
        await expect(this.page.locator(sign_up_iframe2).contentFrame().locator('#form')).toContainText('PhonePhone*requiredYes, please text me about new products and exclusive savings!');
        await this.page.locator(sign_up_iframe2).contentFrame().getByPlaceholder('Enter your mobile number').click();
        await this.page.locator(sign_up_iframe2).contentFrame().getByPlaceholder('Enter your mobile number').fill('212-345-6788');
        await this.page.locator(sign_up_iframe2).contentFrame().locator('#form_input_opt_in').check();
        await this.page.locator(sign_up_iframe2).contentFrame().getByLabel('Submit Modal Form').click();
        await expect(this.page.locator(sign_up_iframe2).contentFrame().getByText('Check Your Texts')).toBeVisible();
        await expect(this.page.locator(sign_up_iframe2).contentFrame().getByText('Reply \'Y\' to confirm.')).toBeVisible();
        await this.page.locator(sign_up_iframe2).contentFrame().getByRole('button', { name: 'Close Modal' }).click();
    }

    // async selectSubCategoryFromMegaMenu() {
    //     try {
    //         const randomCategory = expectedCategories[Math.floor(Math.random() * expectedCategories.length)];
    //         // Click the homepage category
    //         await this.homepage_category.click();

    //         // Get the first visible item in the first <ul>
    //         //const firstLi = await this.getRandomVisibleItem(`ul[role="menu"] > li:has-text("${randomCategory}")`);
    //         const firstLi = await this.getRandomVisibleItem('ul[role="menu"] > li');
    //         if (!firstLi) {
    //             console.log('No items found in the first <ul>');
    //             return;
    //         }

    //         // Click the first visible item in the first <ul>
    //         await firstLi.hover();
    //         // await firstLi.waitFor({ state: 'visible', timeout: 5000 });
    //         // Get the second visible item in the second <ul>
    //         const secondLi = await this.getRandomVisibleItem(firstLi, 'div.customtablescrollbar > ul > li > div');
    //         if (!secondLi) {
    //             console.log('No items found in the second <ul>');
    //             return;
    //         }
    //         await secondLi.hover();
    //         // Ensure the secondLi is clickable with a timeout
    //         await secondLi.waitFor({ state: 'visible', timeout: 5000 });
    //         // Click the second visible item in the second <ul>
    //         await secondLi.click();
    //         // Wait for the expected URL and the network to be idle
    //         const expectedURL = new RegExp(/.*\/(categories)\/[^\/]+/);
    //         await this.page.waitForURL(expectedURL);
    //         //await expect(this.page).toHaveURL(expectedURL);
    //         console.log('Successfully navigated to the subcategory page.');
    //     } catch (error) {
    //         console.error('An error occurred while selecting a subcategory:', error);
    //     }
    // }


    // async getRandomVisibleItem(baseLocator, nestedSelector = null) {
    //     const locator = nestedSelector ? baseLocator.locator(nestedSelector) : this.page.locator(baseLocator);
    //     await locator.first().waitFor({ state: 'visible' });

    //     const itemCount = await locator.count();
    //     if (itemCount > 0) {
    //         const randomIndex = Math.floor(Math.random() * itemCount);
    //         return locator.nth(randomIndex);
    //     }

    //     return null;
    // }

    async selectSubCategoryFromMegaMenu(expectedCategories) {
        try {
          const randomCategory = expectedCategories[Math.floor(Math.random() * expectedCategories.length)];
          // Click the homepage category
          await this.homepage_category.click();
      
          // Get the first visible item in the first <ul> that matches the randomCategory
          const firstLi = await this.getRandomVisibleItem(`ul[role="menu"] > li:has-text("${randomCategory}")`);
          if (!firstLi) {
            console.log(`No items found in the first <ul> that match "${randomCategory}"`);
            return;
          }
      
          // Click the first visible item in the first <ul>
          await firstLi.hover();
          await firstLi.waitFor({ state: 'visible', timeout: 5000 });
          // Get the second visible item in the second <ul>
          const secondLi = await this.getRandomVisibleItem(firstLi, 'div.custom-scrollbar > ul > li > a');
          if (!secondLi) {
            console.log('No items found in the second <ul>');
            return;
          }
          await secondLi.hover();
          // Ensure the secondLi is clickable with a timeout
          await secondLi.waitFor({ state: 'visible', timeout: 5000 });
          // Click the second visible item in the second <ul>
          await secondLi.click();
          // Wait for the expected URL and the network to be idle
          const expectedURL = new RegExp(`.*\/(categories)\/[^\/]+`);
          await this.page.waitForURL(expectedURL);
          console.log('Successfully navigated to the subcategory page.');
        } catch (error) {
          console.error('An error occurred while selecting a subcategory:', error);
        }
      }
      
      async getRandomVisibleItem(baseLocator, nestedSelector = null) {
        const locator = nestedSelector ? baseLocator.locator(nestedSelector) : this.page.locator(baseLocator);
        await locator.first().waitFor({ state: 'visible' });
      
        const itemCount = await locator.count();
        if (itemCount > 0) {
          const randomIndex = Math.floor(Math.random() * itemCount);
          return locator.nth(randomIndex);
        }
      
        return null;
      }

    // async getRandomVisibleItem(baseLocator, nestedSelector = null) {
    //     try {
    //         // Create the locator for the items
    //         const locator = nestedSelector ? baseLocator.locator(nestedSelector) : this.page.locator(baseLocator);

    //         // Wait for at least one item to be visible
    //         await locator.first().waitFor({ state: 'visible', timeout: 10000 });

    //         // Get the count of items
    //         const itemCount = await locator.count();
    //         console.log(`Found ${itemCount} items matching the locator.`); // Debugging output

    //         if (itemCount > 0) {
    //             // Select a random item
    //             const randomIndex = Math.floor(Math.random() * itemCount);
    //             const item = locator.nth(randomIndex);

    //             // Ensure the item is visible before returning it
    //             await item.waitFor({ state: 'visible', timeout: 5000 });
    //             return item;
    //         } else {
    //             console.log('No visible items found.');
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error('Error in getRandomVisibleItem:', error);
    //         return null;
    //     }
    // }

}


