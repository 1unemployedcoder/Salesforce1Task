import { LightningElement, track, wire } from 'lwc';
import searchProducts from '@salesforce/apex/productSearchController.searchProducts';
import getProducts from '@salesforce/apex/products.getProducts';
import getProductTypes from '@salesforce/apex/orderFilter.getProductTypes';
import getProductFamilies from '@salesforce/apex/orderFilter.getProductFamilies';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createOrderAndOrderItems from '@salesforce/apex/orderController.createOrderAndOrderItems';

export default class ProductSearchAndList extends LightningElement {
    @track searchTerm;
    @track searchResults;
    @track displayProducts;
    @track isModalOpen1 = false;
    @track isModalOpen2 = false;
    @track showCartModal = false;
    @track showCheckoutView = true;
    @track products;
    @track showOrderManagement = true;
    @track totalProductCount = 0;
    @track selectedProducts = [];
    totalPrice = 0;
    selectedProduct;
    selectedType = '';
    selectedFamily = '';
    typeOptions = [];
    familyOptions = [];
    accountId;

    handleOpenOrderManagement() {
        this.showOrderManagement = false;
        this.showCheckoutView = false;
        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Log In',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }

    handleLogout() {
        this.showOrderManagement = true;
        this.showCheckoutView = false;
        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Log Out',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }

    handleFetchImage(productName) {
        fetch(`http://www.glyffix.com/api/Image?word=${product.Name}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.image) {
                    product.Image__c = data.image;
                } else {
                }
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    }

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
        const selectedProductIds = this.selectedProducts.map(product => product.Id);
        const totalPrice = this.totalPrice;
        const totalProductCount = this.totalProductCount;
        this.showCheckoutView = true;
        this.showCartModal = false;

        createOrderAndOrderItems({ accountId: this.accountId, totalPrice, totalProductCount })
            .then(() => {
                const toastEvent = new ShowToastEvent({
                    title: 'Success',
                    message: 'Order Created!',
                    variant: 'success'
                });
                this.dispatchEvent(toastEvent);
            })
            .catch(error => {
            });
    }

    goBack() {
        this.showCheckoutView = false;
        this.selectedProducts = [];
        this.totalPrice = 0;
        this.totalProductCount = 0;
    }

    handleSearch() {
        searchProducts({ searchTerm: this.searchTerm })
            .then(result => {
                this.searchResults = result;
                this.filterProducts();
            })
            .catch(error => {
            });
    }

    filterProducts() {
        let filteredProducts = this.products;

        if (this.searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.Name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                (product.Description__c && product.Description__c.toLowerCase().includes(this.searchTerm.toLowerCase()))
            );
        }

        if (this.selectedType) {
            filteredProducts = filteredProducts.filter(product => product.Type__c === this.selectedType);
        }

        if (this.selectedFamily) {
            filteredProducts = filteredProducts.filter(product => product.Family__c === this.selectedFamily);
        }

        this.displayProducts = filteredProducts;
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

        const quantity = 1;
        const price = product.Price__c;

        const existingProduct = this.selectedProducts.find(item => item.Name === product.Name);
        if (existingProduct) {
            existingProduct.quantity += quantity;
            existingProduct.subtotal = existingProduct.Price__c * existingProduct.quantity;
        } else {
            const newProduct = { ...product, quantity: quantity, subtotal: price };
            this.selectedProducts.push(newProduct);
        }

        this.totalProductCount = this.selectedProducts.reduce((total, product) => total + product.quantity, 0);
        this.totalPrice = this.selectedProducts.reduce((total, product) => total + product.subtotal, 0);

        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Product added to cart',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }

    get quantity() {
        const quantityMap = this.selectedProducts.reduce((map, product) => {
            map[product.Name] = (map[product.Name] || 0) + 1;
            return map;
        }, {});

        this.totalProductCount = Object.values(quantityMap).reduce((total, quantity) => total + quantity, 0);

        return product => quantityMap[product.Name] || 0;
    }

    getProductSubtotal(product) {
        return product.Price__c * this.quantity(product);
    }
}
