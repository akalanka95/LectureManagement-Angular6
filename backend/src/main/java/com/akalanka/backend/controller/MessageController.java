package com.akalanka.backend.controller;

import com.akalanka.backend.model.Message;
import com.akalanka.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/messages")
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;

    @RequestMapping("/findAll")
    public List<Message> findAll(){
        return  messageRepository.findAll();
    }
    @RequestMapping("/save")
    public Message save(@RequestBody Message message)
    {
        return messageRepository.save(message);
    }
    @RequestMapping("/findByLectureId/{lecId}")
    public Iterable<Message> findByLectureId(@PathVariable("lecId") Integer lecId){
        return  messageRepository.findByLectureId(lecId);
    }


}
