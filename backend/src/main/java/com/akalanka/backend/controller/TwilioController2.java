package com.akalanka.backend.controller;

import com.twilio.twiml.MessagingResponse;
import com.twilio.twiml.TwiMLException;
import com.twilio.twiml.messaging.Body;
import com.twilio.twiml.messaging.Message;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping(value = "api/messages")
public class TwilioController2 {

    public static final String ACCOUNT_SID = "ACe60bfd733f938a5ad795dc4a5e76ba28";
    public static final String AUTH_TOKEN = "94072466da8b44b5ec8833b2799e4d30";
    public static final String TWILIO_NUMBER = "+44 7479 270578 ";

    @RequestMapping(value = {"recieve"},method = RequestMethod.POST)
    public void twilioReceiveMessage(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String res = request.getParameter("Body");
        String num = request.getParameter("From");
        System.out.println( "This is respons" + res + num);


        /*String plainCreds = "'key=AAAA8WvGAe0:AP' +\n" +
                "                'A91bEeJwSAyOa3yeE397BpWEsrVR5ZtRmTIG' +\n" +
                "                'iqz1cGvLvCmm-b6aEh4B7gVWsHJjVcuuRMo_GvaqjEGBKLwzn3_9-Qzdiw5Ir1-_74GQl7Xa1Hp_BVy5BNcFtAuMAS4KEHslZHBpYf',\n" +
                "                ";
        byte[] plainCredsBytes = plainCreds.getBytes();
        byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
        String base64Creds = new String(base64CredsBytes);*/

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","key =AAAA8WvGAe0:APA91bEeJwSAyOa3yeE397BpWEsrVR5ZtRmTIGiqz1cGvLvCmm-b6aEh4B7gVWsHJjVcuuRMo_GvaqjEGBKLwzn3_9-Qzdiw5Ir1-_74GQl7Xa1Hp_BVy5BNcFtAuMAS4KEHslZHBpYf");
        headers.setContentType(MediaType.APPLICATION_JSON);
        String url = "https://fcm.googleapis.com/fcm/send";
        String send =  "{" +
                "\"notification\":{" +
                "\"title\": \"Hello World\"," +
                "\"body\": \"This is Message" +
                " from" +
                " Admin\"" +
                "}," +
                " \"to\" : \"eGGmliph6ys:APA91bHT6q9Dpr" +
                "KOUU30gMcXwW5YqsRqyrb_Pr8T3Us7u7__" +
                "1F2E11Yz79Aj610PRENSiuznI15knr7NJ-1vVoCxldZ0ZdkZf" +
                "hAZrizDK_vZpEVmj_EenmcDJJoLYHb9syrwxAdw4pcJ\"" +
                "}";
        HttpEntity<String> entity = new HttpEntity<String>(send,headers);
        String answer = restTemplate.postForObject(url, entity, String.class);
        System.out.println("Sending notify when recived message");
        System.out.println(answer);
        /*String body = {
                "notification": {
            "title": "Hello World",
                    "body": "This is Message from Admin"
        },
        "to" : "fHIqdSaWVKc:APA91bHXVGLe" +
                "0Gpwwt-WDXm-9HdcPf0J0TwBl6tfXNg83JfYkf6Ys9" +
                "SujbGsgE59BBbXDkaE0i_Y_KYVCD_nkm-bG" +
                "LDmpor7CFJghddZ_baYuFcce9qkCq_cfLl2-M06nSolWSyAzJs2"
        }*/

        response.setContentType("application/xml");
            Body body = new Body
                    .Builder("The Robots are coming! Head for the hills!")
                    .build();
            Message sms = new Message
                    .Builder()
                    .body(body)
                    .build();
            MessagingResponse twiml = new MessagingResponse
                    .Builder()
                    .message(sms)
                    .build();
        try {
            response.getWriter().print(twiml.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
