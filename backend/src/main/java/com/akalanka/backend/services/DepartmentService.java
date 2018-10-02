package com.akalanka.backend.services;

import com.akalanka.backend.model.Department;
import com.akalanka.backend.model.Student;

import java.util.List;

public interface DepartmentService {

    List<Department> findAll();

    Department findOne(Integer id);

    Boolean save(Department department);

    void removeOne(Integer id);
}
