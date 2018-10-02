package com.akalanka.backend.config;

import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;

import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Store;

public class GmailInbox {

    public void read() {

        Properties props = new Properties();

        try {
            props.load(new FileInputStream(new File("K:\\Github-Daily-Projects\\Angular-Dashboard-Version6\\backend\\src\\main\\resources\\smtp.properties")));
            Session session = Session.getDefaultInstance(props, null);

            Store store = session.getStore("imaps");
            store.connect("smtp.gmail.com", "akalankagamage1995@gmail.com", "Am19950718");

            Folder inbox = store.getFolder("inbox");
            inbox.open(Folder.READ_ONLY);
            int messageCount = inbox.getMessageCount();

            System.out.println("Total Messages:- " + messageCount);

            Message[] messages = inbox.getMessages();
            System.out.println("------------------------------");

            for (int i = 0; i < 100; i++) {
                System.out.println("Mail Subject:- " + messages[i].getSubject());
            }

            inbox.close(true);
            store.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}