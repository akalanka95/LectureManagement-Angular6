package com.akalanka.backend.controller;

import com.akalanka.backend.model.Student;
import com.akalanka.backend.model.Token;
import com.akalanka.backend.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = {"api/token" , "token"})
public class TokenController {
    @Autowired
    private TokenService tokenService;

    @RequestMapping("/save")
    public Token saveToken(@RequestBody Token token){
        System.out.println("Come to token service controller");
        return  tokenService.save(token);
    }

    @RequestMapping("/findAll")
    public List<Token> findAll(){
        return  tokenService.findAll();
    }


}
