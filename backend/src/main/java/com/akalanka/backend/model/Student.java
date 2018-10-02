package com.akalanka.backend.model;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO	)
    private Integer id;
    //@NotEmpty(message = "Please enter the Full Name!")
    private String fullName;
    //@NotEmpty(message = "Please enter the Address!")
    private String Address;
    //@NotEmpty(message = "Please enter the Email!")
    //@Email
    private String email;
    //@NotEmpty(message = "Please enter the Contact Number!")
    private String contact;
    //@NotEmpty(message = "Please enter the Role!")
    private String role;
    private boolean active;
    private String imageUrl;
    private String code;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,
    CascadeType.REFRESH})
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.REFRESH})
    @JoinColumn(name = "semester_id")
    private Semester semester;

    @Transient
    private MultipartFile file;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
