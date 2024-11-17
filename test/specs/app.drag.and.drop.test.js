import dragAndDrop from "../../pageobjects/drag.screen.page.js";
import logger from "../../logger.js";

describe("Drag and Drop tests", () => {
  it("should be able to drag and drop and complete the picture", async () => {
    logger.info("Starting drag and drop test");
    await dragAndDrop.openDragAndDrop();
    // Define the elements to loop through
    const positions = ["l", "c", "r"];
    const indices = [1, 2, 3];

    // Loop through the elements and perform drag and drop
    for (const pos of positions) {
      for (const index of indices) {
        const dragElement = dragAndDrop.dragElements[`${pos}${index}`];
        const dropElement = dragAndDrop.dropElements[`${pos}${index}`];
        await dragAndDrop.performDragAndDrop(dragElement, dropElement);
      }
    }
    await dragAndDrop.assertDragDropElementsDoesNotExist();
    await dragAndDrop.assertRetryButtonAndYouMadeItIsVisible();
    logger.info("Completed drag and drop test");
  });
});
