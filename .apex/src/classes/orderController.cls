public class orderController {
	@AuraEnabled
	public static Id createOrder(Id accountId, List<Id> productIds) {
		Order__c order = new Order__c(
				Name = 'New Order',
				AccountID__c = accountId
		);
		insert order;

		List<OrderItem__c> orderItems = new List<OrderItem__c>();
		for (Id productId : productIds) {
			OrderItem__c orderItem = new OrderItem__c(
					OrderId__c = order.Id,
					ProductID__c = productId,
					Quantity__c = 1, // Здесь ты можешь установить желаемое значение количества
					Price__c = 0 // Здесь ты можешь установить желаемую цену
			);
			orderItems.add(orderItem);
		}
		insert orderItems;

		return order.Id;
	}
}