package com.akalanka.backend.services;

import com.akalanka.backend.model.User;
import com.akalanka.backend.model.security.UserRole;

import java.util.Set;


public interface UserService {
	
	User createUser(User user, Set<UserRole> userRoles);

}
