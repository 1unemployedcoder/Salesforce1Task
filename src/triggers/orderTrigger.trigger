trigger orderTrigger on OrderItem__c (after insert, after update, after delete) {
	if (Trigger.isAfter) {
		if (Trigger.isInsert || Trigger.isUpdate) {
			orderController.updateOrderTotals(Trigger.new);
		} else if (Trigger.isDelete) {
			orderController.updateOrderTotals(Trigger.old);
		}
	}
}