import { LightningElement } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class Products extends LightningElement {
  products = [
    { Id: '1', Name: 'Product 1', Description: 'Description 1' },
    { Id: '2', Name: 'Product 2', Description: 'Description 2' },
    { Id: '3', Name: 'Product 3', Description: 'Description 3' }
  ];

  showModal = false;
  selectedProductId;

  handleDetailsClick(event) {
    this.selectedProductId = event.target.dataset.productId;
    this.showModal = true;
  }

}