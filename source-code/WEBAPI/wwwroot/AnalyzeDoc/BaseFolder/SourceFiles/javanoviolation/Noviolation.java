import java.util.*;
import java.security.*;

class HelloWorld_Good {
    public double getNumber(long seed){
        SecureRandom random = new SecureRandom();
        random.setSeed(seed);
        double number = random.nextDouble();
        return number;
    }
    public void good(){
	  HelloWorld_Good hw = new HelloWorld_Good();
        System.out.println("\n "+hw.getNumber(1L));
        System.out.println("\n "+hw.getNumber(2L));
    }
}