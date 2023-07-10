import { LightningElement, api } from 'lwc';

export default class ProductDetailsModal extends LightningElement {
    @api showModal = false;

    @api show() {
        this.showModal = true;
    }

    @api hide() {
        this.showModal = false;
    }

    handleModalClose() {
        // Вызывайте событие onclose, чтобы оповестить родительский компонент
        const closeModalEvent = new CustomEvent('close');
        this.dispatchEvent(closeModalEvent);
    }
}
