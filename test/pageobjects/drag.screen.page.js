class DragAndDropPage {
    get homeButton() { return $('~Home'); }
    get dragButton() { return $('~Drag'); }
    get dragElement() { return $('~drag-l1'); }
    get dropElement() { return $('~drop-l1'); }

    async openDragAndDrop() {
        await this.homeButton.waitForDisplayed({ timeout: 20000 });
        await this.dragButton.click();
        return this;
    }

    async performDragAndDrop(dragElement, dropElement) {
        await dragElement.waitForDisplayed();
        await dropElement.waitForDisplayed();
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, origin: dragElement, x: 0, y: 0 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, origin: dropElement, x: 0, y: 0 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        return this;
    }

    async assertDragElementDoesNotExist(){
        const doesExist = await this.dragElement.isExisting();
        expect(doesExist).toBe(false);
    }
}

module.exports = new DragAndDropPage();