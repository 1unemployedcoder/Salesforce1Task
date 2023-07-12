import { LightningElement, track, wire } from 'lwc';
import searchProducts from '@salesforce/apex/productSearchController.searchProducts';
import getProducts from '@salesforce/apex/products.getProducts';
import getProductTypes from '@salesforce/apex/orderFilter.getProductTypes';
import getProductFamilies from '@salesforce/apex/orderFilter.getProductFamilies';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createOrder from '@salesforce/apex/orderController.createOrder';

export default class ProductSearchAndList extends LightningElement {
    @track searchTerm;
    @track searchResults;
    @track displayProducts;
    @track isModalOpen1 = false;
    @track isModalOpen2 = false;
    @track showCartModal = false;
    @track products;
    @track selectedProducts = []; // Массив для хранения выбранных продуктов
    totalPrice = 0; // Переменная для хранения общей суммы продуктов
    selectedProduct;
    selectedType = '';
    selectedFamily = '';
    typeOptions = [];
    familyOptions = [];
    accountId;

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

          createOrder({ accountId: this.accountId, productIds: selectedProductIds })
              .then(result => {
                  // Обработка успешного создания заказа
                  // Например, перенаправление на стандартную страницу заказа
                  window.location.href = '/' + result;
              })
              .catch(error => {
                  // Обработка ошибки при создании заказа
                  const toastEvent = new ShowToastEvent({
                      title: 'Error',
                      message: 'Failed to create order',
                      variant: 'error'
                  });
                  this.dispatchEvent(toastEvent);
              });
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

        const existingProduct = this.selectedProducts.find(item => item.Name === product.Name);
        if (existingProduct) {
            existingProduct.quantity++;
            existingProduct.subtotal = existingProduct.Price__c * existingProduct.quantity;
        } else {
            const newProduct = { ...product, quantity: 1, subtotal: product.Price__c };
            this.selectedProducts.push(newProduct);
        }

        // Вычислить общую сумму продуктов
        this.totalPrice = this.selectedProducts.reduce((total, product) => total + product.subtotal, 0);

        // Показать Toast сообщение
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

    return product => quantityMap[product.Name] || 0;
}

getProductSubtotal(product) {
    return product.Price__c * this.quantity(product);
}

}