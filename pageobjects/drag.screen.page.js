class DragAndDropPage {
  get homeButton() {
    return $("~Home");
  }
  get dragButton() {
    return $("~Drag");
  }
  get dragElements() {
    return {
      l1: $("~drag-l1"),
      c1: $("~drag-c1"),
      r1: $("~drag-r1"),
      l2: $("~drag-l2"),
      c2: $("~drag-c2"),
      r2: $("~drag-r2"),
      l3: $("~drag-l3"),
      c3: $("~drag-c3"),
      r3: $("~drag-r3"),
    };
  }

  get dropElements() {
    return {
      l1: $("~drop-l1"),
      c1: $("~drop-c1"),
      r1: $("~drop-r1"),
      l2: $("~drop-l2"),
      c2: $("~drop-c2"),
      r2: $("~drop-r2"),
      l3: $("~drop-l3"),
      c3: $("~drop-c3"),
      r3: $("~drop-r3"),
    };
  }
  get renewButton() {
    return $("~renew");
  }
  get retryButton() {
    return $("~button-Retry");
  }
  get youMadeItText() {
    return $(
      "//android.widget.TextView[@text='You made it, click retry if you want to try it again.']"
    );
  }
  get congratsText() {
    return $("//android.widget.TextView[@text='Congratulations']");
  }

  async openDragAndDrop() {
    await this.homeButton.waitForDisplayed({ timeout: 20000 });
    await this.dragButton.click();
    return this;
  }

  async performDragAndDrop(dragElement, dropElement) {
    await dragElement.waitForDisplayed();
    await dropElement.waitForDisplayed();
    const dragElementId = await dragElement.elementId;
    const dropElementId = await dropElement.elementId;
    await driver.performActions([
        {
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, origin: { 'element-6066-11e4-a52e-4f735466cecf': dragElementId }, x: 0, y: 0 },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerMove', duration: 1000, origin: { 'element-6066-11e4-a52e-4f735466cecf': dropElementId }, x: 0, y: 0 },
                { type: 'pointerUp', button: 0 }
            ]
        }
    ]);
  }

  async assertDragDropElementsDoesNotExist() {
    const positions = ["l", "c", "r"];
    const indices = [1, 2, 3];
    for (const pos of positions) {
      for (const index of indices) {
        const dragElement = await $(`~drag-${pos}${index}`);
        const doesExist = await dragElement.isExisting();
        expect(doesExist).toBe(
          false,
          `Expected drag element drag-${pos}${index} to not exist`
        );
      }
    }
  }

  async clickRenewButton() {
    await this.renewButton.click();
    return this;
  }

  async assertRetryButtonAndYouMadeItIsVisible() {
    const doesExist = await this.retryButton.isExisting();
    expect(doesExist).toBe(true, `Expected retry button to exist`);
    const doesExistText = await this.youMadeItText.isExisting();
    expect(doesExistText).toBe(true, `Expected you made it text to exist`);
    const doesExistCongratsText = await this.congratsText.isExisting();
    expect(doesExistCongratsText).toBe(true, `Expected congrats text to exist`);
  }
}

module.exports = new DragAndDropPage();
