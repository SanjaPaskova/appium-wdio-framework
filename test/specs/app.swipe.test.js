import { expect } from '@wdio/globals';

describe('App swipe tests', () => {
    it('should be able to swipe horizontal by swiping the carousel from left to right @regression', async () => {
        // Check if the home screen is displayed (you can check for a unique element)
        await $('~Home').waitForDisplayed();
        await $('~Swipe').click();

        // Determine the rectangles of the carousel
        await $('~Carousel').waitForDisplayed();
        const carouselElement = await $('~Carousel');
        const carouselRectangles = await driver.getElementRect(carouselElement.elementId);

        // Determine the center position of the carousel on the screen
        const y = Math.round(carouselRectangles.y + carouselRectangles.height / 2);
        const fromX = Math.round(carouselRectangles.x + carouselRectangles.width * 0.9);
        const toX = Math.round(carouselRectangles.x + carouselRectangles.width * 0.1);

        const elem0 = await $('//android.view.ViewGroup[@resource-id="__CAROUSEL_ITEM_0_READY__"]');
        const cardRectangles0 = await driver.getElementRect(elem0.elementId);
        expect(cardRectangles0.x === 0).toBeTruthy();

        // Execute the swipe gesture by providing a starting position and an end position
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    // Start on the right of the carousel
                    { type: 'pointerMove', duration: 0, x: fromX, y: y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    // Move to the left of the carousel
                    { type: 'pointerMove', duration: 1000, x: toX, y: y },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);

        const elem = await $('//android.view.ViewGroup[@resource-id="__CAROUSEL_ITEM_1_READY__"]');
        const cardRectangles = await driver.getElementRect(elem.elementId);
        expect(cardRectangles.x === 0).toBeTruthy();
        // Fix the assertion to check if the element does not exist
        const doesElem0Exist = await elem0.isExisting();
        expect(doesElem0Exist).toBeFalsy();         

    });
});