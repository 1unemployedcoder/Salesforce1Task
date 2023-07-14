import { LightningElement, track, wire } from 'lwc';
import getProducts from '@salesforce/apex/products.getProducts';

export default class ModalPopupLWC extends LightningElement {
    @track isModalOpen1 = false;
    @track isModalOpen2 = false;
    @track products;
    selectedProduct;


    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
        } else if (error) {
            console.error(error);
        }
    }

    openModal1(event) {
        const productId = event.target.dataset.id;
        this.selectedProduct = this.products.find(product => product.Name === productId);
        this.isModalOpen1 = true;
        this.isModalOpen2 = false;
    }

    closeModal1() {
        this.isModalOpen1 = false;
    }

    submitDetails1() {
        this.isModalOpen1 = false;

    }

    openModal2() {
        this.isModalOpen2 = true;
        this.isModalOpen1 = false;
    }

    closeModal2() {
        this.isModalOpen2 = false;
    }

    submitDetails2() {
        this.isModalOpen2 = false;

    }
}