## General info
This project is simple one-page application to allow the user to create an order.
	
## Technologies
Project is created with:
* Salesforce Dev
* Apex, JavaScript, HTML with SLDS
* LWC components

## Screenshots app

### Log In with Name and ID Account

![Log In with Name and ID Account](https://github.com/1unemployedcoder/Salesforce1Task/blob/master/screens/log%20in.jpg)

### Interface of creation order

![Interface of creation order](https://github.com/1unemployedcoder/Salesforce1Task/blob/master/screens/UI%20Page.jpg)

Wee see account name and id, list of products, search by name and description, button of creation another product, filter by type and family product, cart, and button of Log Out.

### Details product button

![Details product button](https://github.com/1unemployedcoder/Salesforce1Task/blob/master/screens/Details%20product.jpg)

Every product have some characteristics.

### Create product button

![Create product button](https://github.com/1unemployedcoder/Salesforce1Task/blob/master/screens/CreateProduct%20Page.jpg)

### Cart button

![Cart button](https://github.com/1unemployedcoder/Salesforce1Task/blob/master/screens/Cart%20page.jpg)

In cart we will see count added products, subtotal and total price.

### Check out page

![Check out page](https://github.com/1unemployedcoder/Salesforce1Task/blob/master/screens/CheckOut%20Page.jpg)

After click on checkout in cart we will see this page.

## Short review

Main LWC components in this project:
* productOne - biggest LWC with so much functions, templates and algorithms.
* createButton - LWC, which is a button that creates a product. (ofc if u isManager = true)
* orderPage - LWC, which displays you your Account and AccountID__c

I have a lot more LWCs, but I decided to combine them into productOne, because it was more convenient for me to work with code and functions, I could visually look and see the problem. So the logic of the code was more obvious to me, since I'm still new to this.

Main APEX classes in this project:
* ismanager - obviusly
* orderFilter - filter by type and family
* products - query request to Product__c object
* productSearchController - search for name and description
* test (haha) - apex class which send request about AccountID__c, Name
* orderController - biggest class which works with orderOne together and counts, queries, returns data.

Also Im added test classes in which come UNIT TESTS:
* orderControllerTest
* orderFilterTest
* searchTest




