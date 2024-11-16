const dragAndDrop = require('../pageobjects/drag.screen.page.js');

describe('Drag and Drop tests', () => {
    it('should be able to drag and drop and complete the picture', async () => {
        await dragAndDrop.openDragAndDrop();
        await dragAndDrop.performDragAndDrop(await $('~drag-l1'), await $('~drop-l1'));
        await dragAndDrop.performDragAndDrop(await $('~drag-l2'), await $('~drop-l2'));
        await dragAndDrop.assertDragElementDoesNotExist();
    });

});

