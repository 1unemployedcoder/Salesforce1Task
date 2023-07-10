public with sharing class products {
	@AuraEnabled(cacheable=true)
	public static List<Product__c> getProducts() {
		return [SELECT  Name, Description__c, Price__c, Image__c, Family__c, Type__c FROM Product__c];
	}
}