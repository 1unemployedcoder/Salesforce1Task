import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class PubSub extends LightningElement {
    @wire(CurrentPageReference) pageRef;
}