package com.akalanka.backend.repository;

import com.akalanka.backend.model.Message;
import com.akalanka.backend.model.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    Iterable<Message> findByLectureId(@Param("lecId") Integer lecId);
}
