package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.Token;
import com.akalanka.backend.repository.TokenRepository;
import com.akalanka.backend.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("tokenService")
public class TokenServiceImp implements TokenService {
    @Autowired
    private TokenRepository tokenRepository;

    @Override
    public List<Token> findAll() {
        return tokenRepository.findAll();
    }

    @Override
    public Token save(Token token) {
        return tokenRepository.save(token);
    }
}
