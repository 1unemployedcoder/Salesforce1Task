@isTest
public class orderControllerTest {
	@isTest
	static void testCreateOrderAndOrderItems() {
		// Создаем тестовые данные
		Account testAccount = new Account();
		testAccount.Name = 'Test Account';
		insert testAccount;

		Product__c testProduct = new Product__c();
		testProduct.Name = 'Test Product';
		testProduct.Price__c = 10;
		insert testProduct;

		// Вызываем метод, который нужно протестировать
		orderController.createOrderAndOrderItems(100, 5);

		// Проверяем созданный заказ
		List<Order__c> orders = [SELECT Id, Name, AccountID__c, TotalPrice__c, TotalProductCount__c FROM Order__c];
		System.assertEquals(1, orders.size());
		Order__c createdOrder = orders[0];
		System.assertEquals('ORD-', createdOrder.Name.substring(0, 4));
		System.assertEquals(testAccount.Id, createdOrder.AccountID__c);
		System.assertEquals(100, createdOrder.TotalPrice__c);
		System.assertEquals(5, createdOrder.TotalProductCount__c);

		// Проверяем созданные элементы заказа
		List<OrderItem__c> orderItems = [SELECT Id, OrderId__c, ProductID__c, Quantity__c, Price__c FROM OrderItem__c];
		System.assertEquals(1, orderItems.size());
		OrderItem__c createdOrderItem = orderItems[0];
		System.assertEquals(createdOrder.Id, createdOrderItem.OrderId__c);
		System.assertEquals(testProduct.Id, createdOrderItem.ProductID__c);
		System.assertEquals(1, createdOrderItem.Quantity__c);
		System.assertEquals(testProduct.Price__c, createdOrderItem.Price__c);
	}
}