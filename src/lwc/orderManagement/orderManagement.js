import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class OrderManagement extends NavigationMixin(LightningElement) {
    handleOpenOrderManagement() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://d060000010mz3eae-dev-ed.develop.lightning.force.com/lightning/n/Order_Management'
            }
        });
    }
}