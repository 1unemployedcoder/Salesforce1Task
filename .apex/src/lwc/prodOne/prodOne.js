import { LightningElement, track, wire } from 'lwc';
import searchProducts from '@salesforce/apex/productSearchController.searchProducts';
import getProducts from '@salesforce/apex/products.getProducts';
import getProductTypes from '@salesforce/apex/orderFilter.getProductTypes';
import getProductFamilies from '@salesforce/apex/orderFilter.getProductFamilies';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ProductSearchAndList extends LightningElement {
    @track searchTerm;
    @track searchResults;
    @track displayProducts;
    @track isModalOpen1 = false;
    @track isModalOpen2 = false;
    @track showCartModal = false;
    @track products;
    @track selectedProducts = []; // New property to store selected products
    selectedProduct;
    selectedType = '';
    selectedFamily = '';
    typeOptions = [];
    familyOptions = [];

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
    }

    openCartModal() {
        this.showCartModal = true;
      }

     closeCartModal() {
        this.showCartModal = false;
      }

      checkout() {
          // Implement your checkout logic here
        }

    handleSearch() {
        searchProducts({ searchTerm: this.searchTerm })
            .then(result => {
                this.searchResults = result;
                this.filterProducts();
            })
            .catch(error => {
                // Обработка ошибки
            });
    }

filterProducts() {
    this.displayProducts = this.products.filter(product =>
        (product.Name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (product.Description__c && product.Description__c.toLowerCase().includes(this.searchTerm.toLowerCase())))
        && (this.selectedType === '' || product.Type__c === this.selectedType)
        && (this.selectedFamily === '' || product.Family__c === this.selectedFamily)
    );
}

    get isSearchResultsEmpty() {
        return this.searchResults && this.searchResults.length === 0;
    }

    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
            this.filterProducts();
        } else if (error) {
            console.error(error);
        }
    }

    openModal1(event) {
        const productId = event.target.dataset.id;
        this.selectedProduct = this.products.find(product => product.Name === productId);
        this.isModalOpen1 = true;
        this.isModalOpen2 = false;
    }

    closeModal1() {
        this.isModalOpen1 = false;
    }

    submitDetails1() {
        this.isModalOpen1 = false;
        // Add your code to call Apex method or perform some processing for modal 1
    }

    openModal2() {
        this.isModalOpen2 = true;
        this.isModalOpen1 = false;
    }

    closeModal2() {
        this.isModalOpen2 = false;
    }

    submitDetails2() {
        this.isModalOpen2 = false;
        // Add your code to call Apex method or perform some processing for modal 2
    }
@wire(getProductTypes)
wiredProductTypes({ error, data }) {
    if (data) {
        this.typeOptions = [{ label: 'None', value: '' }, ...data.map((type) => ({ label: type, value: type }))];
    } else if (error) {
        console.error(error);
    }
}

@wire(getProductFamilies)
wiredProductFamilies({ error, data }) {
    if (data) {
        this.familyOptions = [{ label: 'None', value: '' }, ...data.map((family) => ({ label: family, value: family }))];
    } else if (error) {
        console.error(error);
    }
}

handleTypeChange(event) {
    this.selectedType = event.target.value;
    this.filterProducts();
}

handleFamilyChange(event) {
    this.selectedFamily = event.target.value;
    this.filterProducts();
}
handleAddToCart(event) {
    const productId = event.target.dataset.id;
    const product = this.products.find(product => product.Name === productId);
    this.selectedProducts.push(product); // Add the selected product to selectedProducts array

    // Show Toast message
    const toastEvent = new ShowToastEvent({
        title: 'Success',
        message: 'Product added to cart',
        variant: 'success'
    });
    this.dispatchEvent(toastEvent);

}
}