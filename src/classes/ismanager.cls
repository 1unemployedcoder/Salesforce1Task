public with sharing class ismanager {
	@AuraEnabled(cacheable=true)
	public static Boolean isCurrentUserManager() {
		Id currentUserId = UserInfo.getUserId();
		User currentUser = [SELECT IsManager__c FROM User WHERE Id = :currentUserId];
		return currentUser.IsManager__c;
	}
}