package com.akalanka.backend.services;

import com.akalanka.backend.model.TimeTable;
import com.akalanka.backend.model.Token;

import java.util.List;

public interface TokenService {
    List<Token> findAll();
    Token save(Token token);
}
