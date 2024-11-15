const { expect } = require('@wdio/globals');
const { default: homePage } = require('../pageobjects/home.page');
const dragAndDropPage = require('../pageobjects/drag.screen.page.js');
HomePage = require('../pageobjects/home.page');

describe('Drag and Drop tests', () => {

    it('should drag and drop to complete the picture @regression', async () => {
        // Check if the home screen is displayed (you can check for a unique element)
        await $('~Home').waitForDisplayed({
            timeout: 20000});
        await $('~Drag').click(); 
        // Look for the home screen's element (e.g., button with "API Demos" label)
        await  $('~drag-l1').waitForDisplayed();
        expect(await $('~drag-l1').isDisplayed()).toBe(true);
        expect(await $('~drop-l1').isDisplayed()).toBe(true);
        await driver.performActions([
            {
                // 1. Create the event
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    // 2. Move finger into start position where the element is
                    //    Appium can automatically determine the location of the element instead
                    //    of doing it ourselves
                    { type: 'pointerMove', duration: 0, origin: await $('~drag-l1') },
                    // 3. Finger comes down into contact with screen
                    { type: 'pointerDown', button: 0 },
                    // 4. Pause for a little bit
                    { type: 'pause', duration: 100 },
                    // 5. Finger moves to the second element.
                    //    Appium can automatically determine the location of the element instead
                    //    of doing it ourselves
                    { type: 'pointerMove', duration: 250, origin: await $('~drop-l1')  },
                    // 6. Finger lets up, off the screen
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);
        await driver.performActions([
            {
                // 1. Create the event
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    // 2. Move finger into start position where the element is
                    //    Appium can automatically determine the location of the element instead
                    //    of doing it ourselves
                    { type: 'pointerMove', duration: 0, origin: await $('~drag-l2') },
                    // 3. Finger comes down into contact with screen
                    { type: 'pointerDown', button: 0 },
                    // 4. Pause for a little bit
                    { type: 'pause', duration: 100 },
                    // 5. Finger moves to the second element.
                    //    Appium can automatically determine the location of the element instead
                    //    of doing it ourselves
                    { type: 'pointerMove', duration: 250, origin: await $('~drop-l2')  },
                    // 6. Finger lets up, off the screen
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);
        expect(await $('~drag-l1').isDisplayed()).toBe(false);
        expect(await $('~drop-l1').isDisplayed()).toBe(false);
        expect(await $('~drag-l2').isDisplayed()).toBe(false);       
    });

});

