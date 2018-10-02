package com.akalanka.backend.controller;

import com.akalanka.backend.model.Lecture;
import com.akalanka.backend.model.Result;
import com.akalanka.backend.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/results")
public class ResultController {
    @Autowired
    private ResultRepository resultRepository;

    @RequestMapping("/findAll")
    public List<Result> findAll(){
        return  resultRepository.findAll();
    }
    @RequestMapping("/save")
    public Result save(@RequestBody Result result){
        return resultRepository.save(result);
    }


}
