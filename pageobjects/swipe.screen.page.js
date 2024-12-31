class SwipeScreenPage {
    get homeButton() { return $('~Home'); }
    get swipeButton() { return $('~Swipe'); }
    get carousel() { return $('~Carousel'); }

    get carouselItem0() { return $(this.locatorStrategy("__CAROUSEL_ITEM_0_READY__"));}
    get carouselItem1() { return $(this.locatorStrategy("__CAROUSEL_ITEM_1_READY__"));}

    locatorStrategy(selector) {
        return driver.isIOS
            ? `~${selector}`
            : `//*[@resource-id="${selector}"]`;
    }

    async openSwipeScreen() {
        await this.homeButton.waitForDisplayed();
        await this.swipeButton.click();
    }

    async getCarouselRectangles() {
        await this.carousel.waitForDisplayed();
        return await driver.getElementRect((await this.carousel).elementId);
    }

    async swipeLeft(fromX, toX, y) {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: fromX, y: y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, x: toX, y: y },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
    }

    async assertCarouselItemPosition(carouselItem) {
        const elem = await carouselItem;
        const cardRectangles = await driver.getElementRect(elem.elementId);
        expect(cardRectangles.x === 0).toBeTruthy('Expected carousel item to be at position x = 0, but it is not.');
    }

    async assertCarouselItemDoesNotExist(carouselItem) {
        const doesExist = await carouselItem.isExisting();
        expect(doesExist).toBeFalsy('Expected carousel item not to exist, but it does.');
    }

    async assertCarouselItemIsDisplayed(carouselItem) {
        const cardRectangles = await driver.getElementRect((await carouselItem).elementId);
        expect(cardRectangles.x === 0).toBeTruthy('Expected carousel item to be displayed, but it is not.');
    }
}

export default new SwipeScreenPage();