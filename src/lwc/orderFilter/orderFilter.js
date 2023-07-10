import { LightningElement, wire } from 'lwc';
import getProductTypes from '@salesforce/apex/orderFilter.getProductTypes';
import getProductFamilies from '@salesforce/apex/orderFilter.getProductFamilies';

export default class FilterComponent extends LightningElement {
    selectedType = '';
    selectedFamily = '';
    typeOptions = [];
    familyOptions = [];

    @wire(getProductTypes)
    wiredProductTypes({ error, data }) {
        if (data) {
            this.typeOptions = data.map((type) => ({ label: type, value: type }));
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getProductFamilies)
    wiredProductFamilies({ error, data }) {
        if (data) {
            this.familyOptions = data.map((family) => ({ label: family, value: family }));
        } else if (error) {
            console.error(error);
        }
    }

    handleTypeChange(event) {
        this.selectedType = event.target.value;
        // Дополнительная логика при изменении значения Type
    }

    handleFamilyChange(event) {
        this.selectedFamily = event.target.value;
        // Дополнительная логика при изменении значения Family
    }
}