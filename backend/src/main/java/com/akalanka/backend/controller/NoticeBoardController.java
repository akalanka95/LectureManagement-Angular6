package com.akalanka.backend.controller;

import com.akalanka.backend.model.NoticeBoard;
import com.akalanka.backend.model.Student;
import com.akalanka.backend.services.NoticeBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/notices")
public class NoticeBoardController {
    @Autowired
    private NoticeBoardService noticeBoardService;
    @RequestMapping("/save")
    public NoticeBoard save(@RequestBody NoticeBoard noticeBoard)
    {
        System.out.println("Notice bOard controller");
        return noticeBoardService.save(noticeBoard);
    }

}
