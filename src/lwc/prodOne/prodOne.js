import { LightningElement, track, wire } from 'lwc';
import searchProducts from '@salesforce/apex/productSearchController.searchProducts';
import getProducts from '@salesforce/apex/products.getProducts';

export default class ProductSearchAndList extends LightningElement {
    @track searchTerm;
    @track searchResults;
    @track displayProducts;
    @track isModalOpen1 = false;
    @track isModalOpen2 = false;
    @track products;
    selectedProduct;

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
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
            product.Name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            (product.Description__c && product.Description__c.toLowerCase().includes(this.searchTerm.toLowerCase()))
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
}