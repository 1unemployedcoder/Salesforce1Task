public class orderController {
	@AuraEnabled
	public static Id createOrder(Id accountId, List<Id> productIds) {
		Account account = [SELECT AccountID__c FROM Account LIMIT 1];

		Order__c order = new Order__c(
				Name = 'New Order',
				AccountID__c = account.Id
		);
		insert order;

		List<OrderItem__c> orderItems = new List<OrderItem__c>();
		for (Id productId : productIds) {
			OrderItem__c orderItem = new OrderItem__c(
					OrderId__c = order.Id,
					ProductID__c = productId,
					Quantity__c = 1,
					Price__c = 0
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

	public static void updateOrder(Id orderId, Decimal totalPrice, List<ProductData> products) {
		Order__c order = new Order__c(Id = orderId, TotalPrice__c = totalPrice);
		update order;

		List<OrderItem__c> orderItems = new List<OrderItem__c>();
		for (ProductData product : products) {
			OrderItem__c orderItem = new OrderItem__c(
					OrderId__c = orderId,
					ProductID__c = product.productId,
					Quantity__c = product.quantity,
					Price__c = product.price
			);
			orderItems.add(orderItem);
		}

		update orderItems;
	}

	public class ProductData {
		public Id productId;
		public Decimal quantity;
		public Decimal price;

		public ProductData(Id productId, Decimal quantity, Decimal price) {
			this.productId = productId;
			this.quantity = quantity;
			this.price = price;
		}
	}


}