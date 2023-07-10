import { LightningElement, api, wire } from 'lwc';
import getAccountDetails from '@salesforce/apex/orderManagementController.getAccountDetails';

export default class orderManagementPage extends LightningElement {
    @api accountId;
    accountName;
    accountId;

    @wire(getAccountDetails, { accountId: '$accountId' })
    wiredAccount({ error, data }) {
        if (data) {
            this.accountName = data.Name;
            this.accountId = data.AccountId__c;
        } else if (error) {
            // Обработка ошибки
        }
    }
}