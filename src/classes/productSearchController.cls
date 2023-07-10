public with sharing class productSearchController {
	@AuraEnabled(cacheable=true)
	public static List<Product__c> searchProducts(String searchTerm) {
		String searchQuery = '%' + searchTerm + '%';

		List<Product__c> products = [SELECT  Name, Description__c
		FROM Product__c
		WHERE (Name LIKE :searchQuery OR Description__c LIKE :searchQuery)];

		return products;
	}
}