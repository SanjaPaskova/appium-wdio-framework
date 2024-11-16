import dragAndDrop from '../pageobjects/drag.screen.page.js';
import logger from '../../logger.js';

describe('Drag and Drop tests', () => {
    it('should be able to drag and drop and complete the picture', async () => {
        logger.info('Starting drag and drop test');
        await dragAndDrop.openDragAndDrop();
        await dragAndDrop.performDragAndDrop(await $('~drag-l1'), await $('~drop-l1'));
        await dragAndDrop.performDragAndDrop(await $('~drag-l2'), await $('~drop-l2'));
        await dragAndDrop.assertDragElementDoesNotExist();
        logger.info('Completed drag and drop test');
    });

});

