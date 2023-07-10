import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import isCurrentUserManager from '@salesforce/apex/ismanager.isCurrentUserManager';

export default class CreateProductButton extends LightningElement {
    isManager;

    @wire(isCurrentUserManager)
    wiredIsManager({ error, data }) {
        if (data) {
            this.isManager = data;
        } else if (error) {
            // Обработка ошибки при вызове Apex-метода
        }
    }

    createProduct() {
        // Логика создания нового продукта
        // Используйте createRecord для создания записи продукта
    }
}