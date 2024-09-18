package org.ren1kron;

import com.fastcgi.FCGIInterface;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.nio.charset.StandardCharsets;

public class Main {
    private static final String HTTP_RESPONSE = """
            Status: 200 OK
            Content-Type: application/json
            Content-Length: %d
            
            %s
            """;
    private static final String HTTP_ERROR = """
            Status: 400 Bad Request
            Content-Type: application/json
            Content-Length: %d
            
            %s
            """;
    private static final String RESULT_JSON = """
            {
                "result": %b
            }
            """;
    private static final String ERROR_JSON = """
            {
                "reason": "%s"
            }
            """;
    private static final Logger log = LogManager.getLogger(Main.class);


    public static void main(String[] args) {
        var fcgi = new FCGIInterface();
        log.error("HUI");
        while (fcgi.FCGIaccept() >= 0) {
            try {
                var queryParams = System.getProperties().getProperty("QUERY_STRING");
                log.error("Got information: {}", queryParams);
                var params = new Params(queryParams);

                log.error("Received parameters: x = {}, y = {}, r = {}", params.getX(), params.getY(), params.getR());


                var result = calculate(params.getX(), params.getY(), params.getR());

                var json = String.format(RESULT_JSON, result);
                var response = String.format(HTTP_RESPONSE, json.getBytes(StandardCharsets.UTF_8).length + 2, json);
                System.out.println(response);
                log.error(response);
            } catch (ValidationException e) {
                var json = String.format(ERROR_JSON, e.getMessage());
                var response = String.format(HTTP_ERROR, json.getBytes(StandardCharsets.UTF_8).length + 2, json);
                System.out.println(response);
                log.error(response);
            }
        }
    }

    private static boolean calculate(float x, float y, float r) {
        if (x < 0 && y < 0) { // if in 3rd quarter
            return false;
        }
        if (x < 0 && y > 0) { // if in 2nd quarter
            if ((x*x + y*y) > r*r) { // and NOT in circle
                return false;
            }
        }
        if (x > 0 && y > 0) { // if in 1st quarter
            if (!(x + y <= r/2)) { // and NOT in triangle
                return false;
            }
        }
        if (x > 0 && y < 0) { // if in 4th quarter
            if (!((y >= -r) && (x <= r))) { // and NOT in square
                return false;
            }
        }
        if (x == 0) {
            if (y>r || y<-r) {
                return false;
            }
        }
        if (y == 0) {
            if (x>r || x<-r) {
                return false;
            }
        }
        return true;
//        if (x < 0 && y > 0) {
//            log.error("not true");
//            return false;
//        }
//        if (x > 0 && y < 0) {
//            if ((x * x + y * y) > (r / 2) * (r / 2)) {
//                log.error("not true");
//                return false;
//            }
//        }
//        if (x < 0 && y < 0) {
//            if ((x / 2 + y) < -r / 2) {
//                log.error("not true");
//                return false;
//            }
//        }
//        if (x < 0 && y > 0) {
//            if (x < -r / 2 || y > r) {
//                log.error("not true");
//                return false;
//            }
//        }
//        log.error("true");
//        return true;
    }
}