package ean.warrick.cis_320_lab_3;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListDeleteServlet", value = "/api/name_list_delete")
public class NameListDeleteServlet extends HttpServlet {
    private String message;
    private final static Logger log = Logger.getLogger(NameListDeleteServlet.class.getName());
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
        //System.out.println(requestString);
        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);
        int id = Integer.parseInt(requestString);
        // Great! Now we want to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        System.out.println(id);
        PersonDAO.removePerson(id);
    }


    public void destroy() {
    }
}