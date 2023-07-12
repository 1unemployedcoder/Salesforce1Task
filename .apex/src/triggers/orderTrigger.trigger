trigger orderTrigger on OrderItem__c (after insert, after update, after delete) {
	if (Trigger.isAfter) {
		Set<Id> orderIds = new Set<Id>();

		if (Trigger.isInsert || Trigger.isUpdate) {
			for (OrderItem__c orderItem : Trigger.new) {
				orderIds.add(orderItem.OrderId__c);
			}
		} else if (Trigger.isDelete) {
			for (OrderItem__c orderItem : Trigger.old) {
				orderIds.add(orderItem.OrderId__c);
			}
		}

		if (!orderIds.isEmpty()) {
			List<Order__c> ordersToUpdate = new List<Order__c>([
					SELECT Id
					FROM Order__c
					WHERE Id IN :orderIds
			]);

			for (Order__c order : ordersToUpdate) {
				Decimal totalProductCount = 0;
				Decimal totalPrice = 0;

				for (OrderItem__c orderItem : [
						SELECT Quantity__c, Price__c
						FROM OrderItem__c
						WHERE OrderId__c = :order.Id
				]) {
					totalProductCount += orderItem.Quantity__c;
					totalPrice += orderItem.Quantity__c * orderItem.Price__c;
				}

				order.TotalProductCount__c = totalProductCount.intValue();
				order.TotalPrice__c = totalPrice;
			}

			update ordersToUpdate;
		}
	}
}