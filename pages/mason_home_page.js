import test, { expect } from 'playwright/test';
const homepage_locator = JSON.parse(JSON.stringify(require('../object_repositories/mason_home_page_repo.json')));

exports.HomePage = class HomePage {
    constructor(page) {
        this.page = page;
        this.homepage_searchbarplaceholder = page.getByPlaceholder(homepage_locator.homepage_searchbarplaceholder);
        this.homepage_searchbutton = page.getByLabel(homepage_locator.homepage_searchbutton, { exact: true });
        this.homepage_signin = page.locator(homepage_locator.homepage_signin);
        this.homepage_cart = page.getByRole('button', { name: homepage_locator.homepage_cart });
        this.homepage_category = page.getByRole('button', { name: homepage_locator.homepage_category });
        this.minicart_drawer_heading = page.getByRole('button', { name: homepage_locator.minicart_drawer_heading });
        this.minicart_drawer_subtotalsection = page.getByText(homepage_locator.minicart_drawer_subtotalsection);
        this.minicart_drawer_viewcart_button = page.getByRole('button', { name: homepage_locator.minicart_drawer_viewcart_button });
        this.minicart_drawer_checkout_button = page.getByRole('button', { name: homepage_locator.minicart_drawer_checkout_button });
        this.footer_signupemail_textbox = page.getByPlaceholder(homepage_locator.footer_signupemail_textbox);
        this.footer_signup_button = page.getByRole('button', { name: homepage_locator.footer_signup_button });
        this.addtoCartButtonPLP = page.locator('button:has-text("Add to Cart")');

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
    async displaySiteLogo(brandLogoName) {
        await expect(this.page.getByRole('link', { name: brandLogoName, exact: true })).toBeVisible();
    }
    async clickSiteLogo(brandLogoName) {
        await this.page.getByRole('link', { name: brandLogoName, exact: true }).click();

    }

    async homePageRedirectionValidation(homePageUrl) {
        await expect(this.page).toHaveURL(homePageUrl);
    }
    async displayHeroBanner(bannerName) {
        await expect(this.page.getByRole('link', { name: bannerName })).toBeVisible();
    }
    async displayFooter(footerName) {
        await expect(this.page.getByText(footerName)).toBeVisible();
    }

    async clickOnHomePageSignIn() {
        await this.homepage_signin.click();
    }

    async closeSignedInDrawer() {
        await this.page.getByRole('button').nth(1).click();
    }

    async categoryL1ToBeVisibleOnDepartmentHover() {
        await this.homepage_category.hover();
        // Wait for the L1 categories to become visible
        await this.page.waitForSelector(homepage_locator.homepage_l1category, { state: 'visible' });
    }


    async countAllL1Categories() {
        await this.homepage_category.hover();
        // Wait for the L1 categories to become visible
        //await this.page.waitForSelector('#mainMenu > ul > li', { state: 'visible' });
        // Count all the L1 categories
        const l1Categories = await this.page.$$(homepage_locator.homepage_l1category);
        const l1Count = l1Categories.length;
        return l1Count;
    }

    async checkIfcategoryL1isBold(l1Category) {
        //await (this.page.$(`a:text("${l1Category}")`)).hover();
        //await this.page.waitForSelector(homepage_locator.homepage_l1category, { state: 'visible' });
        const element = await this.page.$(`a:text("${l1Category}")`);
        //  const element = await this.page.$('a:text("Clothing, Shoes + Bags")');

        if (element) {

            await element.hover();
            const fontWeight = await element.evaluate(el => window.getComputedStyle(el).fontWeight);
            const isBold = parseInt(fontWeight) >= 700 || fontWeight === 'bold';
            expect(isBold).toBe(true);
        } else {
            console.log('Element not found.');
        }
    }

    async hoverOnL1() {
        const mainMenuItemList = ['Outdoor Living + Tools', 'Health + Beauty'];
        const l1Category = mainMenuItemList[Math.floor(Math.random() * mainMenuItemList.length)];
        
        // Locate the main menu item by matching the L1 category text
        const mainMenuItems = await this.page.locator('#mainMenu ul[role="menu"] > li');
        const matchingMenuItem = mainMenuItems.locator('a.cursor-pointer', { hasText: l1Category, exact: true });
    
        // Wait for the L1 category link to be visible
        await matchingMenuItem.waitFor({ state: 'visible' });
    
        if (matchingMenuItem) {
            // Get the font weight before hovering
            const fontWeightbefore = await matchingMenuItem.evaluate(el => window.getComputedStyle(el).fontWeight);
            console.log('Font Weight before hover: ', fontWeightbefore);
    
            // Hover over the element
            await matchingMenuItem.hover();
            const subcategoryMenu =  matchingMenuItem.locator('+ div.custom-scrollbar');

            // Wait for the submenu div to be visible
            await subcategoryMenu.waitFor({ state: 'visible' });
    
            // Get the font weight after hovering
            const fontWeight = await matchingMenuItem.evaluate(el => window.getComputedStyle(el).fontWeight);
            console.log('Font Weight after hover: ', fontWeight);
    
            // Check if the font weight is bold (>=700 or exactly 'bold')
            const isBold = parseInt(fontWeight) >= 700 || fontWeight === 'bold';
            console.log('Is the font bold? ', isBold);
            
            // Ensure the font weight is bold after hovering
            expect(isBold).toBe(true);
        } else {
            console.log('Element not found.');
        }
    }
    

async selectRandomSubCategory() {
    

    const mainMenuItemList = ['Outdoor Living + Tools', 'Health + Beauty'];
        const l1Category = mainMenuItemList[Math.floor(Math.random() * mainMenuItemList.length)];
        // Locate the main menu item by matching the L1 category text
        const mainMenuItems = await this.page.locator('#mainMenu ul[role="menu"] > li');
        const matchingMenuItem = mainMenuItems.locator('a.cursor-pointer', { hasText: l1Category, exact: true });

        // Wait for the L1 category link to be visible and click it
        await matchingMenuItem.waitFor({ state: 'visible' });
        await matchingMenuItem.hover();
    //const subcategoryMenu = matchingMenuItem.locator('div.customtablescrollbar.group-hover\\:flex');
    const subcategoryMenu =  matchingMenuItem.locator('+ div.custom-scrollbar');

// Wait for the submenu div to be visible
await subcategoryMenu.waitFor({ state: 'visible' });
    // Ensure you're interacting with the right element by specifying an index or refining further
    //await subcategoryMenu.waitFor({ state: 'visible' });

    // Continue with your subcategory selection and interaction
    const subcategoriesLocator = subcategoryMenu.locator('ul > li a.cursor-pointer');
    const subcategoriesCount = await subcategoriesLocator.count();

    // Select a random subcategory
    const randomSubcategoryIndex = Math.floor(Math.random() * subcategoriesCount);
    const randomSubcategory = subcategoriesLocator.nth(randomSubcategoryIndex);
    const subCatName = await randomSubcategory.textContent();
    console.log(subCatName);
    // Click on the random subcategory
    await randomSubcategory.click();
    // Locate the breadcrumb's last 'li' element
    await this.page.locator('nav[aria-label="Breadcrumb"] ol > li').last().waitFor({ state: 'visible' });
    await this.page.locator('section.plpGrid').first().waitFor({ state: 'visible' });
    const lastBreadcrumbItem = await this.page.locator('nav[aria-label="Breadcrumb"] ol > li').last();
    // Get the text content of the last 'li' element
    const lastBreadcrumbText = await lastBreadcrumbItem.textContent();
    // Extract the last two words of the sub-category name
    const lastTwoWords = subCatName.split(' ').slice(-2).join(' ');

    // Escape special regex characters in the extracted words
    const escapedPattern = lastTwoWords.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a flexible regex pattern to:
    // 1. Match any starting word(s) (e.g., "All").
    // 2. Match the escaped last two words.
    // 3. Ignore case and apostrophes.
    const regexPattern = new RegExp(`(?:.*\\b)?${escapedPattern.replace(/\\'/g, "")}`, 'i');

    // Check if the last breadcrumb text matches the flexible regex pattern
    expect(lastBreadcrumbText.trim()).toMatch(regexPattern);
}



    async getRandomL1CategoryText() {
        const elements = await this.page.locator('#mainMenu ul[role="menu"] > li');
        await elements.first().waitFor({ state: 'visible' });


        // const texts = [];
        // for (let element of elements) {
        //   const text = await element.innerText();
        //   texts.push(text);
        // }

        const midpoint = Math.ceil(elements.length / 2);

        // Extract texts from the first half of the elements
        const texts = [];
        for (let i = 0; i < midpoint; i++) {
            const text = await elements[i].innerText();
            texts.push(text);
        }
        // Select a random text from the extracted list
        const randomIndex = Math.floor(Math.random() * texts.length);
        const randomText = texts[randomIndex];

        console.log(randomText);
        return [randomText, randomIndex];
    }

    async l2andl3TobeVisibleOnL1Hover(index) {
        const l2Selector = homepage_locator.l2category.replace('${index + 1}', index + 1);
        const l3Selector = homepage_locator.l3category.replace('${index + 1}', index + 1);
        try {
            // Check if L2 element is visible
            await this.page.waitForSelector(l2Selector, { visible: true, timeout: 5000 });
            // Check if L3 element is visible
            await this.page.waitForSelector(l3Selector, { visible: true, timeout: 5000 });
        } catch (error) {
            // Handle timeout error
            console.error("L2 or L3 elements are not available within the timeout.");
        }

    }

    async ensureGreyOverlayOnCategoryHover() {
        // Hover over "departments" menu item
        await this.homepage_category.hover();
        // Evaluate whether the element is beneath the overlay

        const pageUnderneathLocator = homepage_locator.page_underneath;
        const isBeneathOverlay = await this.page.evaluate((locator) => {
            const element = document.evaluate(locator, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (!element) return false; // Return false if the element is not found

            const rect = element.getBoundingClientRect();
            return !(rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth);
        }, pageUnderneathLocator);

        // Assert that the element is beneath the overlay
        expect(isBeneathOverlay).toBe(true);




        /*const isOverlayAdded = await this.page.isVisible('overlay_selector');
        
        // // Step 3: Check if the current page gets disabled
        // const isPageDisabled = await this.page.evaluate((isOverlayAdded) => {
        //   const element = document.evaluate('//body/div[1]/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        //   const elementRect = element.getBoundingClientRect();
        //   return isOverlayAdded && (elementRect.top >= window.innerHeight || elementRect.bottom <= 0);
        // }, isOverlayAdded); // Pass isOverlayAdded as an argument
        
                            //console.log('Link:', await linkElement.getAttribute('href'));
                            //console.log('Image source:', srcAttribute);
                            console.log('Alt text:', altAttribute);
                        } else {
                            console.log('Link element not found for logo item.');
                        }
                    } catch (error) {
                        console.error('Error processing logo item:', error);
                    }
                }
            }
        
            async seasonalSavingsAndViewAlllink(){
                await expect(this.page.getByText('Seasonal Savings')).toBeVisible();
                await expect(this.page.locator('section').filter({ hasText: /^Seasonal SavingsView All$/ }).getByRole('link')).toBeVisible();
            }
        
            async signUpModalDisplayValidation(enterEmail){
                await this.page.getByRole('button', { name: 'Sign Up' }).click();
                await expect(this.page.frameLocator('iframe[title="ZD - D - 01 - Lightbox - FOOTER"]').getByPlaceholder('Enter your email address')).toBeVisible();
                await expect(this.page.frameLocator('iframe[title="ZD - D - 01 - Lightbox - FOOTER"]').getByLabel('Close Modal')).toBeVisible();
                await expect(this.page.frameLocator('iframe[title="ZD - D - 01 - Lightbox - FOOTER"]').getByLabel('Submit Modal Form')).toBeVisible();
                await this.page.frameLocator('iframe[title="ZD - D - 01 - Lightbox - FOOTER"]').getByPlaceholder('Enter your email address').fill(enterEmail);
                await this.page.frameLocator('iframe[title="ZD - D - 01 - Lightbox - FOOTER"]').getByLabel('Submit Modal Form').click();
                await expect(this.page.frameLocator('iframe[title="ZD - D - 01 - Lightbox - FOOTER"]').getByText(/^.*$/).first()).toBeHidden();
            }
        // // Step 4: Assertion
        // expect(isPageDisabled).toBe(true);*/

    }


    // async navigateToCategoryL1(l1Category) {
    //     //await this.homepage_category.click();
    //     const l1CategoryElement = `a:text-is("${l1Category}")`;
    //     await this.page.waitForSelector(l1CategoryElement, { visible: true });
    //     const elements = await this.page.$$(l1CategoryElement);
    //     await elements[0].click();

    //     await this.page.waitForNavigation();
    //     await this.page.waitForSelector(homepage_locator.l1breadcrumb, { visible: true });

    //     // Extract the text content of all <a> elements within the breadcrumb
    //     const breadcrumbLinks = await this.page.evaluate(() => {
    //         const links = Array.from(document.querySelectorAll('nav[aria-label="Breadcrumb"] a'));
    //         return links.map(link => link.textContent.trim());
    //     });
    //     console.log(l1Category);
    //     // Check if any of the breadcrumb links contain the categoryName
    //     const isCategoryNavigated = breadcrumbLinks.some(linkText => linkText.includes(l1Category));
    //     // expect(isCategoryNavigated).toBe(true);
    //     await expect(this.page.getByLabel('Breadcrumb').getByText(l1Category), { exact: true }).toBeVisible();

    // }

    async navigateToCategoryL1Old(l1Category) {
        const l1CategorySelector = `a:text-is("${l1Category}")`;

        // Wait for the L1 category link to be visible and click the first matching element
        await this.page.waitForSelector(l1CategorySelector, { visible: true });
        const l1CategoryElements = await this.page.$$(l1CategorySelector);
        await l1CategoryElements[0].click();

        // Wait for the page to navigate and the breadcrumb to be visible
        await this.page.waitForNavigation();
        await this.page.waitForSelector('nav[aria-label="Breadcrumb"]', { visible: true });

        // Verify the breadcrumb contains the L1 category
        //const breadcrumbSelector = `nav[aria-label="Breadcrumb"] a:text-is("${l1Category}")`;
        const breadcrumbSelector = await this.page.getByLabel('Breadcrumb').getByText(l1Category, { exact: true });

        // Wait for the breadcrumb element to be visible
        await breadcrumbSelector.waitFor({ state: 'visible' });
        await expect(breadcrumbSelector).toBeVisible();
    }

    async navigateToCategoryL1() {
        //const mainMenuItemList = ['Women', 'Men', 'Kids', 'Boot Shop'];
        const mainMenuItemList = ['Outdoor Living + Tools'];
        const l1Category = mainMenuItemList[Math.floor(Math.random() * mainMenuItemList.length)];
        // Locate the main menu item by matching the L1 category text
        const mainMenuItems = await this.page.locator('#mainMenu ul[role="menu"] > li');
        const matchingMenuItem = mainMenuItems.locator(`a:has-text("${l1Category}")`);

        // Wait for the L1 category link to be visible and click it
        await matchingMenuItem.first().waitFor({ state: 'visible' });
        await matchingMenuItem.first().click();

        // Wait for the page to navigate and the breadcrumb to be visible
        await this.page.waitForNavigation();
        await this.page.waitForSelector('nav[aria-label="Breadcrumb"]', { state: 'visible' });

        // Verify the breadcrumb contains the L1 category
        const breadcrumbSelector = this.page.locator('nav[aria-label="Breadcrumb"]').locator(`li:has-text("${l1Category}")`).first();

        // Wait for the breadcrumb element to be visible and assert its visibility
        await breadcrumbSelector.waitFor({ state: 'visible' });
        await expect(breadcrumbSelector).toBeVisible();
    }

    async getRandomL2L3CategoryText(index) {
        const l2Selector = homepage_locator.l2categoryText.replace('${index + 1}', index + 1);
        const l3Selector = homepage_locator.l3categoryText.replace('${index + 1}', index + 1);
        try {
            // Check if L2 element is visible
            await this.page.waitForSelector(l2Selector, { visible: true, timeout: 5000 });
            // Check if L3 element is visible
            await this.page.waitForSelector(l3Selector, { visible: true, timeout: 5000 });
        }
        catch (error) {
            // Handle timeout error
            console.error("L2 or L3 elements are not available within the timeout.");
        }
        // Read the text from all L2 elements
        const l2Texts = await this.page.$$eval(l2Selector, elements => elements.map(element => element.textContent.trim()));
        // Read the text from all L3 elements
        const l3Texts = await this.page.$$eval(l3Selector, elements => elements.map(element => element.textContent.trim()));

        // Function to get a random element from an array
        function getRandomElement(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        // Get a random L2 text and a random L3 text
        const randomL2Text = getRandomElement(l2Texts);
        const randomL3Text = getRandomElement(l3Texts);
        return [randomL2Text, randomL3Text];
    }

    async ensureNoOverlayWhenClickedOutside() {
        // Hover over "departments" menu item
        await this.homepage_category.hover();
        // Evaluate whether the element is beneath the overlay
        //const navigationPromise = this.page.waitForNavigation();
        await this.homepage_searchbarplaceholder.click();
        //await navigationPromise;

        const isL1CategoryVisible = await this.page.isVisible(homepage_locator.homepage_l1category);
        expect(isL1CategoryVisible).toBeFalsy();

    }

    async selectSubCategoryFromMegaMenu() {
        try {
            // Click the homepage category
            await this.homepage_category.click();

            // Get the first visible item in the first <ul>
            const firstLi = await this.getRandomVisibleItem('ul[role="menu"] > li');
            if (!firstLi) {
                console.log('No items found in the first <ul>');
                return;
            }

            // Click the first visible item in the first <ul>
            await firstLi.hover();
            const isBold = await this.checkBoldStyling(firstLi);
            if (!isBold) {
                console.log('First <li> item is not bold when hovered.');
                return;
            }
            // Get the second visible item in the second <ul>
            const secondLi = await this.getRandomVisibleItem(firstLi, 'div.customtablescrollbar > ul > li > a');
            if (!secondLi) {
                console.log('No items found in the second <ul>');
                return;
            }
            await secondLi.hover();
            // Ensure the secondLi is clickable with a timeout
            await secondLi.waitFor({ state: 'visible', timeout: 5000 });
            // Click the second visible item in the second <ul>
            await secondLi.click();
            //await this.page.waitForTimeout(5000);
            // Wait for the expected URL and the network to be idle
            const expectedURL = new RegExp(/.*\/(categories)\/[^\/]+/);
            await this.page.waitForURL(expectedURL);
            //await expect(this.page).toHaveURL(expectedURL);
            await this.addtoCartButtonPLP.first().waitFor({ state: 'visible' });
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

    async checkBoldStyling(element) {
        const fontWeight = await element.evaluate((el) => window.getComputedStyle(el).fontWeight);
        // Font weight 700 or greater typically indicates bold styling
        return parseInt(fontWeight) >= 700;
    }

    async validateSubCategoriesVisibilityOnL1Hover(index) {
        // Locate the main menu items
        const mainMenuItems = await this.page.locator('#mainMenu ul[role="menu"] > li');

        // Ensure the index is within the range
        const mainMenuItemCount = await mainMenuItems.count();
        if (index >= mainMenuItemCount) {
            console.error(`Index ${index} is out of range. Only ${mainMenuItemCount} main menu items available.`);
            return;
        }

        // Hover over the L1 category at the specified index
        const mainMenuItem = mainMenuItems.nth(index);
        await mainMenuItem.hover();

        try {
            // Check if L2 subcategories are visible
            const l2Selector = await mainMenuItem.locator('ul li div.cursor-pointer');
            await this.page.waitForSelector(l2Selector, { visible: true, timeout: 5000 });

            // Check if L3 subcategories (if they exist) are visible
            const l3Selector = await mainMenuItem.locator('ul li ul li div.cursor-pointer');
            await this.page.waitForSelector(l3Selector, { visible: true, timeout: 5000 });

        } catch (error) {
            console.error(`L2 or L3 subcategory not visible within the timeout for L1 category at index ${index}.`);
        }
    }
}
