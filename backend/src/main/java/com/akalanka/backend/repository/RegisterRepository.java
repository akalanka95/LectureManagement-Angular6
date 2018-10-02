package com.akalanka.backend.repository;

import com.akalanka.backend.model.Register;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisterRepository extends JpaRepository<Register, Integer> {
}
