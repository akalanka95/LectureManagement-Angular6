package com.akalanka.backend.repository;

import com.akalanka.backend.model.NoticeBoard;
import com.akalanka.backend.model.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface NoticeBoardRepositiry extends JpaRepository<NoticeBoard , Integer> {
    NoticeBoard findById(@Param("notId") Integer notId);
}
