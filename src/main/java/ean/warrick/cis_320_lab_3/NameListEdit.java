package ean.warrick.cis_320_lab_3;

import com.sun.org.apache.xerces.internal.impl.xpath.regex.Match;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Console;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit", value = "/api/name_list_edit")
public class NameListEdit extends HttpServlet {
    private String message;
    private final static Logger log = Logger.getLogger(NameListEdit.class.getName());
    public void init() {
        message = "Hello World!";
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        log.log(Level.INFO, "doPost for FormTestJSONServlet");

        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);
        System.out.println(requestString);
        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        // Great! Now we want to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.

        Jsonb jsonb = JsonbBuilder.create();
        Person formTestObject = jsonb.fromJson(requestString, Person.class);


        Pattern firstNameValidationPattern = Pattern.compile("^[A-Za-zéüöêå’]{1,45}$");
        Matcher firstNameMatch = firstNameValidationPattern.matcher(formTestObject.getFirst());
        if (!firstNameMatch.find()) {System.out.println("FIRST NAME ERROR");return;}

        Pattern lastNameValidationPattern = Pattern.compile("^[A-Za-zéüöêå']{1,45}$");
        Matcher lastNameMatch = lastNameValidationPattern.matcher(formTestObject.getLast());
        if (!lastNameMatch.find()) {System.out.println("LAST NAME ERROR");return;}

        Pattern emailValidationPattern = Pattern.compile("^[A-Za-z0-9_.]{1,200}@[A-Za-z]{1,50}.com$");
        Matcher emailMatch = emailValidationPattern.matcher(formTestObject.getEmail());
        if (!emailMatch.find()) {System.out.println("Email ERROR");return;}

        Pattern phoneValidationPattern = Pattern.compile("^[1-9][0-9][0-9]-?[0-9][0-9][0-9]-?[0-9][0-9][0-9][0-9]$");
        Matcher phoneMatch = phoneValidationPattern.matcher(formTestObject.getPhone());
        if (!phoneMatch.find()) {System.out.println("Phone ERROR");return;}

        Pattern birthValidationPattern = Pattern.compile("^[\\d][\\d][\\d][\\d]-[\\d][\\d]-[\\d][\\d]$");
        Pattern birthValidationPattern2 = Pattern.compile("^[\\d][\\d][\\d][\\d]-00-00$");
        Matcher birthMatch = birthValidationPattern.matcher(formTestObject.getBirthday());
        Matcher birthMatch2 = birthValidationPattern2.matcher(formTestObject.getBirthday());
        if (!birthMatch.find() || birthMatch2.find()) {System.out.println("Birthday ERROR");return;}

        // Log info as a check
        //log.log(Level.INFO, "Object test: "+ formTestObject.fieldname);

        // Send something back to the client. Really, we should send a JSON, but
        // we'll keep things simple.
        System.out.println("ID:");
        System.out.println(formTestObject.getId());
        if (formTestObject.getId() == 0) {
            PersonDAO.addPerson(formTestObject);
        } else {
            PersonDAO.updatePerson(formTestObject);
        }
    }


    public void destroy() {
    }
}