package com.akalanka.backend.controller;

import com.akalanka.backend.model.Register;
import com.akalanka.backend.repository.RegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/indexes")
public class RegisterController {
    @Autowired
    private RegisterRepository registerRepository;

    @RequestMapping("/save")
    public Register save(@RequestBody Register register){
        return registerRepository.save(register);
    }
    @RequestMapping("/findAll")
    public List<Register> findAll(){
        return registerRepository.findAll();
    }
}
