public class test {
	@AuraEnabled(cacheable=true)
	public static List<Account> getAccounts() {
		String currentUserId = UserInfo.getUserId();
		return [SELECT 	Name, AccountID__c FROM Account LIMIT 1];
	}
}