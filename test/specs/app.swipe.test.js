import swipeScreenPage from '../../pageobjects/swipe.screen.page.js';

describe('App swipe tests', () => {
    it('should be able to swipe horizontal by swiping the carousel from left to right @regression', async () => {
        // Open the swipe screen
        await swipeScreenPage.openSwipeScreen();

        // Determine the rectangles of the carousel
        const carouselRectangles = await swipeScreenPage.getCarouselRectangles();

        // Determine the center position of the carousel on the screen
        const y = Math.round(carouselRectangles.y + carouselRectangles.height / 2);
        const fromX = Math.round(carouselRectangles.x + carouselRectangles.width * 0.9);
        const toX = Math.round(carouselRectangles.x + carouselRectangles.width * 0.1);

        // Execute the swipe gesture
        await swipeScreenPage.swipeLeft(fromX, toX, y);
        // Assert that the first carousel item is displayed at position x = 0
        const carouselItem1 = await swipeScreenPage.carouselItem1;
        await swipeScreenPage.assertCarouselItemPosition(carouselItem1);
        // Assert that the first carousel item does not exist
        const carouselItem0 = await swipeScreenPage.carouselItem0;
        await swipeScreenPage.assertCarouselItemDoesNotExist(carouselItem0);
        // Assert that the second carousel item is displayed
        await swipeScreenPage.assertCarouselItemIsDisplayed(carouselItem1);
    });
});