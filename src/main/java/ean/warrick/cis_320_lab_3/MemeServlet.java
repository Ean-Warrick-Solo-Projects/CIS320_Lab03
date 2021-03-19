package ean.warrick.cis_320_lab_3;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "memeServlet", value = "/meme")
public class MemeServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(MemeServlet.class.getName());
    private String message;

    public void init() {
        message = "Hello World!";
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        log.log(Level.INFO, "Meme Servlet");



        // display image
        ServletContext context = getServletContext();
        InputStream imageStream = context.getResourceAsStream("WEB-INF/classes/shocked_pikachu.png");
        BufferedImage image = ImageIO.read(imageStream);

        // Modify Image
        Graphics g = image.getGraphics();
        String fontName = "TimesNewRoman";
        int fontSize = 65;
        int fontStyle = Font.BOLD;
        Font font = new Font(fontName, fontStyle, fontSize);
        g.setFont(font);

        g.setColor(new Color(30, 30, 40));
        String message1b = "When the professor tells you to make";
        String message2b = "a meme in class";
        String message3b = "Me:";
        int difference = 7;
        g.drawString(message1b, 110, 50 + difference);
        g.drawString(message2b, 110, 110 + difference);
        g.drawString(message3b, 110, 210 + difference);


        g.setColor(new Color(255,255,255));
        String message1 = "When the professor tells you to make";
        String message2 = "a meme in class";
        String message3 = "Me:";
        g.drawString(message1, 110, 50);
        g.drawString(message2, 110, 110);
        g.drawString(message3, 110, 210);

        g.dispose();

                // Hello
        response.setContentType("image/png");
        OutputStream out = response.getOutputStream();
        ImageIO.write(image, "PNG", out);
    }

    public void destroy() {
    }
}