public class HelloWorldController {

	@AuraEnabled
	public static String getHelloWorld(String name) {
		return 'Hello Worlddd, ' + name + ' !';
	}

}