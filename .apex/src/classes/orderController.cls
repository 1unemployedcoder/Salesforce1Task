public with sharing class orderController {
	@AuraEnabled
	public static void createOrderAndOrderItems(Decimal totalPrice, Integer totalProductCount) {
		// Получение значения AccountID__c из объекта Account
		Account account = [SELECT AccountID__c FROM Account LIMIT 1];


		// Создание записи Order__c
		Order__c order = new Order__c();
		order.Name = generateOrderId();
		order.AccountID__c = account.ID;
		order.TotalPrice__c = totalPrice;
		order.TotalProductCount__c = totalProductCount;
		insert order;

		// Получение выбранных продуктов
		List<Product__c> selectedProducts = [SELECT Id, Price__c FROM Product__c];

		// Создание записей OrderItem__c
		List<OrderItem__c> orderItems = new List<OrderItem__c>();

		for (Product__c product : selectedProducts) {
			OrderItem__c orderItem = new OrderItem__c();
			orderItem.OrderId__c = order.Id;
			orderItem.ProductID__c = product.Id;
			orderItem.Quantity__c = 1; // Здесь вы можете использовать свою логику для получения количества продукта
			orderItem.Price__c = product.Price__c; // Используйте цену продукта из поля Price__c
			orderItems.add(orderItem);
		}

		insert orderItems;
	}

	private static String generateOrderId() {
		// Ваша логика для генерации OrderId__c
		return 'ORD-' + String.valueOf(System.currentTimeMillis());
	}
}