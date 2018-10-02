package com.akalanka.backend.repository;

import com.akalanka.backend.model.TimeTable;
import com.akalanka.backend.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Integer> {
}
