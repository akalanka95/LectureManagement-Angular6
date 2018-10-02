package com.akalanka.backend.repository;

import com.akalanka.backend.model.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends CrudRepository<Student , Integer> {

}
