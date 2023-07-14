@isTest
public class searchTest {
	@isTest
	static void testSearchProducts() {

		Product__c product1 = new Product__c(Name = 'Product 1', Description__c = 'Description 1');
		Product__c product2 = new Product__c(Name = 'Product 2', Description__c = 'Description 2');
		insert new List<Product__c>{product1, product2};


		List<Product__c> products = productSearchController.searchProducts('Product');


		System.assertEquals(2, products.size());
		System.assertEquals('Product 1', products[0].Name);
		System.assertEquals('Product 2', products[1].Name);
	}
}