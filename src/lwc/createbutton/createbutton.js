import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import isCurrentUserManager from '@salesforce/apex/ismanager.isCurrentUserManager';

export default class CreateProductModal extends LightningElement {
    isManager;
    showModal = false;
    productName = '';
    productDescription = '';
    productType = '';
    productFamily = '';
    productImage = '';
    productPrice = '';

    @wire(isCurrentUserManager)
    wiredIsManager({ error, data }) {
        if (data) {
            this.isManager = data;
        } else if (error) {

        }
    }

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    handleNameChange(event) {
        this.productName = event.target.value;
    }

    handleProductDescription(event) {
        this.productDescription = event.target.value;
    }

    handleProductType(event) {
        this.productType = event.target.value;
    }

    handleProductFamily(event) {
        this.productFamily = event.target.value;
    }

    handleProductImage(event) {
        this.productImage = event.target.value;
    }

    handleProductPrice(event) {
        this.productPrice = event.target.value;
    }

    createProduct() {

        const fields = {
            Name: this.productName,
            Description__c: this.productDescription,
            Type__c: this.productType,
            Family__c: this.productFamily,
            Image__c: this.productImage,
            Price__c: this.productPrice,

        };

        const recordInput = { apiName: 'Product__c', fields };
        createRecord(recordInput)
            .then(result => {

                this.closeModal();
            })
            .catch(error => {

            });
    }
}