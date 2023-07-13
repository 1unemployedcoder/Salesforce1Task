import { LightningElement, api } from 'lwc';

export default class OrderLayout extends LightningElement {
    @api totalPrice;
    @api totalProductCount;
    @api orderItems;

    connectedCallback() {
        // Обработка параметров состояния маршрута
        console.log('Total Price:', this.totalPrice);
        console.log('Total Product Count:', this.totalProductCount);
        console.log('Order Items:', this.orderItems);
    }
}