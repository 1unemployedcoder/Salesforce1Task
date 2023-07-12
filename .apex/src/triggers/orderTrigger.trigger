trigger orderTrigger on OrderItem__c (after insert, after update, after delete) {
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
				for (OrderItem__c item : items) {
					totalProductCount += item.Quantity__c;
					totalPrice += item.Quantity__c * item.Price__c;
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
}