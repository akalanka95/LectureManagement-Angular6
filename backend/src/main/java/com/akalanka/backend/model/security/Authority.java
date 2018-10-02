package com.akalanka.backend.model.security;

import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;

public class Authority implements GrantedAuthority, Serializable {
	private static final long serialVersionUID = 123123L;
	
	private final String authority;
	
	public Authority(String authority) {
		this.authority = authority;
	}
	
	@Override
	public String getAuthority() {
		return authority;
	}
}
