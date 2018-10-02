package com.akalanka.backend.services;

import com.akalanka.backend.model.NoticeBoard;
import com.akalanka.backend.model.Semester;

import java.util.List;

public interface NoticeBoardService {
    List<NoticeBoard> findAll();
    NoticeBoard save(NoticeBoard semester);
    NoticeBoard findById(Integer notId);
}
