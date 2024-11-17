import { expect } from '@wdio/globals';

describe('App swipe tests', () => {
    it('should be able to swipe horizontal by swiping the carousel from left to right @regression', async () => {
        // Check if the home screen is displayed (you can check for a unique element)
        await $('~Home').waitForDisplayed({
            timeout: 20000
        });
        await $('~Swipe').click();

        // Determine the rectangles of the carousel
        const carouselElement = await $('~Carousel');
        const carouselRectangles = await driver.getElementRect(carouselElement.elementId);

        // Determine the center position of the carousel on the screen
        const y = Math.round(carouselRectangles.y + carouselRectangles.height / 2);
        const fromX = Math.round(carouselRectangles.x + carouselRectangles.width * 0.9);
        const toX = Math.round(carouselRectangles.x + carouselRectangles.width * 0.1);

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

        // Validate that the carousel item is displayed
        expect(await $('//android.view.ViewGroup[@resource-id="__CAROUSEL_ITEM_0_READY__"]')).toBeDisplayed();
    });
});