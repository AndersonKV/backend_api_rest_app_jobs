
/*
Online Java - IDE, Code Editor, Compiler

Online Java is a quick and easy tool that helps you to build, compile, test your programs online.
*/
import java.util.regex.Pattern;

public class Main
{
    
        private Pattern pattern = Pattern.compile("-?\\d+(\\.\\d+)?");
        
 public boolean isNumeric(String strNum) {
        if (strNum == null) {
            return false;
        }
        return pattern.matcher(strNum).matches();
    }
    
    public static void main(String[] args) {
                      System.out.println("Welcome to Online IDE!! Happy Coding :)");

      }
    
 
    
    
    
}
