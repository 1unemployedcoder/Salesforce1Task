import { LightningElement, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class ScreenQuickAction extends LightningElement {
    @api recordId;

    handleScreenClose() {
        console.log("Button press");
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}