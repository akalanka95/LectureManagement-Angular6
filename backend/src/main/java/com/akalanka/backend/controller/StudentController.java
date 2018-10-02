package com.akalanka.backend.controller;

import com.akalanka.backend.model.Department;
import com.akalanka.backend.model.Student;
import com.akalanka.backend.services.DepartmentService;
import com.akalanka.backend.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/students")
public class StudentController {

    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private StudentService studentService;
    private Department department;

    @RequestMapping("/add")
    public Boolean add(){

        department = new Department();
        department.setActive(true);
        department.setDepartmentName("Computing and Information System(CIS)");
        department.setDescription(" The degree program has been designed so that the graduates could cater to the growing demand in government and private sector. ");
        return departmentService.save(department);

    }

    @RequestMapping("/findAll")
    public List<Student> findAll(){
        return  studentService.findAll();
    }

    @RequestMapping("/findById/{id}")
    public Student findOne(@PathVariable ("id") Integer id){
        return  studentService.findOne(id);
    }
    @RequestMapping("/addStudent")
    public Student saveStudent(@RequestBody Student student){
        return studentService.save(student);
    }
    @PutMapping("/updateStudent")
    public Student updateStudent(@RequestBody Student student){
        System.out.println("updtae student controller");
        return  studentService.save(student);
    }
    @RequestMapping("/deleteStudent")
    public void deleteStudent(@RequestBody Student student){
        studentService.delete(student);
    }


}

