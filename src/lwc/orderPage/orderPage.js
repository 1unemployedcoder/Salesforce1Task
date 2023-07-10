import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/test.getAccounts';

export default class MyComponent extends LightningElement {
    accounts;
    selectedAccountId;

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            // Обработка ошибок
        }
    }

    handleAccountSelection(event) {
        this.selectedAccountId = event.target.value;
    }
}