package com.akalanka.backend.repository;


import com.akalanka.backend.model.security.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {

}
