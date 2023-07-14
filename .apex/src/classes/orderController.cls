public with sharing class orderController {
	@AuraEnabled
	public static void createOrderAndOrderItems(Decimal totalPrice, Integer totalProductCount) {

		Account account = [SELECT AccountID__c FROM Account LIMIT 1];



		Order__c order = new Order__c();
		order.Name = generateOrderId();
		order.AccountID__c = account.ID;
		order.TotalPrice__c = totalPrice;
		order.TotalProductCount__c = totalProductCount;
		insert order;


		List<Product__c> selectedProducts = [SELECT Id, Price__c FROM Product__c];


		List<OrderItem__c> orderItems = new List<OrderItem__c>();

		for (Product__c product : selectedProducts) {
			OrderItem__c orderItem = new OrderItem__c();
			orderItem.OrderId__c = order.Id;
			orderItem.ProductID__c = product.Id;
			orderItem.Quantity__c = 1;
			orderItem.Price__c = product.Price__c;
			orderItems.add(orderItem);
		}

		insert orderItems;
	}

	private static String generateOrderId() {
		return 'ORD-' + String.valueOf(System.currentTimeMillis());
	}
}