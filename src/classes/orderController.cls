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
					Quantity__c = 1, // Установите желаемое значение количества
					Price__c = 0 // Установите желаемую цену
			);
			orderItems.add(orderItem);
		}
		insert orderItems;

		updateOrderTotals(orderItems);

		return order.Id;
	}

	public static void updateOrderTotals(List<OrderItem__c> orderItems) {
		Set<Id> orderIds = new Set<Id>();
		for (OrderItem__c orderItem : orderItems) {
			orderIds.add(orderItem.OrderId__c);
		}

		List<Order__c> ordersToUpdate = new List<Order__c>();
		for (Id orderId : orderIds) {
			List<OrderItem__c> items = [
					SELECT Quantity__c, Price__c
					FROM OrderItem__c
					WHERE OrderId__c = :orderId
			];

			Decimal totalProductCount = 0;
			Decimal totalPrice = 0;
			for (OrderItem__c orderItem : items) {
				totalProductCount += orderItem.Quantity__c;
				totalPrice += orderItem.Quantity__c * orderItem.Price__c;
			}

			Order__c order = new Order__c(
					Id = orderId,
					TotalProductCount__c = totalProductCount.intValue(),
					TotalPrice__c = totalPrice
			);
			ordersToUpdate.add(order);
		}

		update ordersToUpdate;
	}

	public static void updateOrder(Id orderId, Decimal totalPrice) {
		Order__c order = new Order__c(
				Id = orderId,
				TotalPrice__c = totalPrice
		);
		update order;
	}


}