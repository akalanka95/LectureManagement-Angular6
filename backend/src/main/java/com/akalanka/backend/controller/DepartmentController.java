package com.akalanka.backend.controller;

import com.akalanka.backend.model.Department;
import com.akalanka.backend.model.Student;
import com.akalanka.backend.services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/departments")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @RequestMapping("/findAll")
    public List<Department> findAll(){
        return  departmentService.findAll();
    }
}
