import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import isCurrentUserManager from '@salesforce/apex/ismanager.isCurrentUserManager';

export default class CreateProductModal extends LightningElement {
    isManager;
    showModal = false;
    productName = '';
    productDescription = '';

    @wire(isCurrentUserManager)
    wiredIsManager({ error, data }) {
        if (data) {
            this.isManager = data;
        } else if (error) {
            // Обработка ошибки при вызове Apex-метода
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

    createProduct() {
        // Логика создания нового продукта
        // Используйте createRecord для создания записи продукта
        const fields = {
            Name: this.productName,
            Description__c: this.productDescription,
            // Другие поля продукта
        };

        const recordInput = { apiName: 'Product__c', fields };
        createRecord(recordInput)
            .then(result => {
                // Обработка успешного создания продукта
                this.closeModal();
            })
            .catch(error => {
                // Обработка ошибки при создании продукта
            });
    }
}