
	 import java.util.*;
import java.security.*;

class HelloWorld_Bad { 
    public double getNumber(long seed){
        SecureRandom random = new SecureRandom();
        random.setSeed(seed);
        double number = random.nextDouble();
        return number;
    }
    public void bad(){
	    HelloWorld_Bad hw = new HelloWorld_Bad();
        System.out.println("\n "+hw.getNumber(-1L));
        System.out.println("\n "+hw.getNumber(-2L));
    } 
}

	