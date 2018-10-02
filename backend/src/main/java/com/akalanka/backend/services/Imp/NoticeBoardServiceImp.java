package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.NoticeBoard;
import com.akalanka.backend.repository.NoticeBoardRepositiry;
import com.akalanka.backend.services.NoticeBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service("noticeBoardService")
public class NoticeBoardServiceImp implements NoticeBoardService {
    @Autowired
    private NoticeBoardRepositiry noticeBoardRepositiry;
    @Override
    public List<NoticeBoard> findAll() {
        return noticeBoardRepositiry.findAll();
    }

    @Override
    public NoticeBoard save(NoticeBoard noticeBoard) {
        return noticeBoardRepositiry.save(noticeBoard);
    }

    @Override
    public NoticeBoard findById(Integer notId) {
        return noticeBoardRepositiry.findById(notId);
    }
}
