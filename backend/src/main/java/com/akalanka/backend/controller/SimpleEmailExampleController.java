package com.akalanka.backend.controller;

import com.akalanka.backend.config.MyConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.Session;

@RestController
@RequestMapping(value = "api")
public class SimpleEmailExampleController {

     private JavaMailSender emailSender;

    @Autowired
    public void setMailSender(JavaMailSender mailSender) {
        this.emailSender = mailSender;
    }

    @ResponseBody
    @RequestMapping("/sendSimpleEmail")
    public String sendSimpleEmail() {
        System.setProperty("mail.mime.charset", "utf8");
        // Create a Simple MailMessage.
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(MyConstants.FRIEND_EMAIL);
        message.setSubject("Test Simple Email");
        message.setText("Hello, Im testing Simple Email" );
        // Send Message!
        this.emailSender.send(message);

        return "Email Sent!";
    }

}
