import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class AccountSelection extends LightningElement {
    selectedAccountId;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountObjectInfo;

    @wire(getRecord, { recordId: '$selectedAccountId', fields: ['Account.Name'] })
    account;

    get accountOptions() {
        if (this.accountObjectInfo.data) {
            const recordTypes = this.accountObjectInfo.data.recordTypeInfos;
            const defaultRecordTypeId = Object.keys(recordTypes).find(
                (rtId) => recordTypes[rtId].defaultRecordTypeMapping
            );

            return Object.values(recordTypes)
                .filter((rt) => rt.available && rt.recordTypeId !== defaultRecordTypeId)
                .map((rt) => ({
                    label: rt.name,
                    value: rt.recordTypeId
                }));
        }
        return [];
    }

    handleAccountChange(event) {
        this.selectedAccountId = event.target.value;
    }
}