package com.akalanka.backend.repository;

import com.akalanka.backend.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department , Integer> {
}
