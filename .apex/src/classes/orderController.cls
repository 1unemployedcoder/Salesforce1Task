public with sharing class orderController {
	@AuraEnabled
	public static void createOrderAndOrderItems(Id accountId, Decimal totalPrice, Integer totalProductCount) {
		// Создание записи Order__c
		Order__c order = new Order__c();
		order.Name = generateOrderId();
		order.AccountID__c = accountId;
		order.TotalPrice__c = totalPrice;
		order.TotalProductCount__c = totalProductCount;
		insert order;

		// Создание записей OrderItem__c
		List<OrderItem__c> orderItems = new List<OrderItem__c>();

		// Получение ProductID__c и Price__c из выбранных продуктов
		List<Product__c> selectedProducts = [SELECT Id, Price__c FROM Product__c];

		for (Product__c product : selectedProducts) {
			OrderItem__c orderItem = new OrderItem__c();
			orderItem.OrderId__c = order.Id;
			orderItem.ProductID__c = product.Id;
			orderItem.Quantity__c = totalProductCount;
			orderItem.Price__c = totalPrice;
			orderItems.add(orderItem);
		}

		insert orderItems;
	}

	private static String generateOrderId() {
		// Ваша логика для генерации OrderId__c
		return 'ORD-' + String.valueOf(System.currentTimeMillis());
	}
}