public with sharing class orderManagementController {
	@AuraEnabled(cacheable=true)
	public static Account getAccountDetails(String accountId) {
		return [SELECT Name, AccountId__c FROM Account WHERE Id = :accountId];
	}
}