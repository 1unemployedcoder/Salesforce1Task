import { LightningElement, track } from 'lwc';

export default class FieldA extends LightningElement {
    @track fieldAValue;

    handleFieldAChange(event) {
        this.fieldAValue = event.target.value;
    }
}