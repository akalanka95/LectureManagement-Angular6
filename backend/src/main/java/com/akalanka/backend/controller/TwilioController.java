package com.akalanka.backend.controller;


import com.akalanka.backend.model.*;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/messages")
public class TwilioController {
    public static final String ACCOUNT_SID = "ACe60bfd733f938a5ad795dc4a5e76ba28";
    public static final String AUTH_TOKEN = "94072466da8b44b5ec8833b2799e4d30";
    public static final String TWILIO_NUMBER = "+44 7479 270578 ";

    @GetMapping(value = "send/{lecture}/{semester}/{date}" +
            "/{startTime}/{endTime}/{hall}/{course}")
    public void twilioSendMessage(@PathVariable("lecture") String lecture,
                                  @PathVariable("semester") String semester,
                                  @PathVariable("date") String date,
                                  @PathVariable("startTime") String startTime,
                                  @PathVariable("endTime") String endTime,
                                  @PathVariable("hall") String hall,
                                  @PathVariable("course") String course
                                  ){
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message sendMessage = Message
                .creator(new PhoneNumber("+94767068361"), // to
                        new PhoneNumber(TWILIO_NUMBER), // from
                        "New Lecture added for " + semester + " regarding " +
                                course + " on " + date + " at " + startTime +
                                " to " + endTime + " in " + hall + " .")
                .create();

        System.out.println(sendMessage);

        /*Message message1 = Message
                .creator(new PhoneNumber(twiliocontactnumberref), // to
                        new PhoneNumber(TWILIO_NUMBER), // from
                        twiliomessageBody)
                .create();*/
    }


}
