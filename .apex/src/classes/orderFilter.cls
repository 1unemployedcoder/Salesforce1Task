public class orderFilter {
	@AuraEnabled(cacheable=true)
	public static List<String> getProductTypes() {
		List<String> types = new List<String>();
		List<Schema.PicklistEntry> picklistValues = Product__c.Type__c.getDescribe().getPicklistValues();

		for (Schema.PicklistEntry picklistValue : picklistValues) {
			types.add(picklistValue.getValue());
		}

		return types;
	}

	@AuraEnabled(cacheable=true)
	public static List<String> getProductFamilies() {
		List<String> families = new List<String>();
		List<Schema.PicklistEntry> picklistValues = Product__c.Family__c.getDescribe().getPicklistValues();

		for (Schema.PicklistEntry picklistValue : picklistValues) {
			families.add(picklistValue.getValue());
		}

		return families;
	}
}