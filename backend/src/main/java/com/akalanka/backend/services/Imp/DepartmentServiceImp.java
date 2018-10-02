package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.Department;
import com.akalanka.backend.repository.DepartmentRepository;
import com.akalanka.backend.services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("departmentService")
public class DepartmentServiceImp implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public List<Department> findAll() {
        return (List<Department>) departmentRepository.findAll();
    }

    @Override
    public Department findOne(Integer id) {
        return departmentRepository.findOne(id);
    }

    @Override
    public Boolean save(Department department) {
         departmentRepository.save(department);
         return true;
    }

    @Override
    public void removeOne(Integer id) {
        departmentRepository.delete(id);
    }
}
