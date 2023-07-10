import { LightningElement, track, wire } from 'lwc';
import searchProducts from '@salesforce/apex/productSearchController.searchProducts';

export default class ProductSearch extends LightningElement {
    @track searchTerm;
    @track searchResults;

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
    }

    handleSearch() {
        searchProducts({ searchTerm: this.searchTerm })
            .then(result => {
                this.searchResults = result;
            })
            .catch(error => {
                // Обработка ошибки
            });
    }

    get isSearchResultsEmpty() {
        return this.searchResults && this.searchResults.length === 0;
    }
}
