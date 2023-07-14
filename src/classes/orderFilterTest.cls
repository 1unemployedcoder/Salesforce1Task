@isTest
public class orderFilterTest {
	@isTest
	static void testGetProductTypes() {

		Product__c product = new Product__c(Type__c = 'Type 1');
		insert product;


		List<String> productTypes = orderFilter.getProductTypes();



		System.assertEquals('Type 1', productTypes[0]);
	}

	@isTest
	static void testGetProductFamilies() {

		Product__c product = new Product__c(Family__c = 'Family 1');
		insert product;


		List<String> productFamilies = orderFilter.getProductFamilies();



		System.assertEquals('Family 1', productFamilies[0]);
	}
}