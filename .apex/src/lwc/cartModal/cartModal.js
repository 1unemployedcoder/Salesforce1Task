import { LightningElement, track } from 'lwc';

export default class Cart extends LightningElement {
    @track showCartModal = false;
    @track cartItems = [];

    openCartModal() {
        this.showCartModal = true;
    }

    closeCartModal() {
        this.showCartModal = false;
    }

    checkout() {
        // Implement your checkout logic here
    }
}