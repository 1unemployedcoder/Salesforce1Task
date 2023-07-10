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
        const productId = event.target.dataset.id; // Получить идентификатор продукта из атрибута data-id кнопки
        this.selectedProduct = this.products.find(product => product.Name === productId); // Найти выбранный продукт в списке products
        this.isModalOpen1 = true; // Открыть модальное окно
        this.isModalOpen2 = false;
    }

    closeModal1() {
        this.isModalOpen1 = false;
    }

    submitDetails1() {
        this.isModalOpen1 = false;
        // Add your code to call Apex method or perform some processing for modal 1
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
        // Add your code to call Apex method or perform some processing for modal 2
    }
}