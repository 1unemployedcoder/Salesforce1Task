public class orderManagementPage {
	public orderManagementPage(String accountId) {
		orderManagementPage page = this;

		// Извлекаем данные аккаунта
		Account account = [SELECT Name, AccountID__c FROM Account WHERE Id = :accountId];

		// Передаем данные аккаунта в экземпляр класса orderManagementPage
		page.accountName = account.Name;
		page.accountId = account.AccountID__c;
	}

	public String accountName { get; set; }
	public String accountId { get; set; }
}