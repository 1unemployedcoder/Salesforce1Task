## General info
This project is simple one-page application to allow the user to create an order.
	
## Technologies
Project is created with:
* Salesforce Dev
* Apex, JavaScript, HTML with SLDS
* LWC components
	
## Short review

Hello Salesforce Team. I wanna to became trainee in your company and so I tried to do this task. It's been hard. Let's view.

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
* orderControllerTest - first and last UNIT test class which testing orderController (70-80% of all code imo)


## My comment about this task
I have never completed any project before, my maximum was to write a telegram bot that follows any narrow instructions. This is my first project that I have taken so seriously. I'll be honest - I tried very hard. Also, this is my first coding experience. I consider myself a fast learner and motivated as I was able to complete this project in 7 days with very little knowledge and using the gpt prompt. I am not ashamed of this and I think that I am a good candidate for the became trainee in your company!
```
$ cd ../lorem
$ npm install
$ npm start
