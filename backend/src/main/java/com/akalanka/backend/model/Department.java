package com.akalanka.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String departmentName;
    private String description;
    private boolean active;

    @OneToMany(mappedBy = "department",
    cascade = {CascadeType.DETACH,CascadeType.MERGE,
    CascadeType.REFRESH})
    @JsonIgnore
    private List<Student> student;

    @OneToMany(mappedBy = "department",
            cascade = {CascadeType.DETACH,CascadeType.MERGE,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<Lecture> lecture;

    @OneToMany(mappedBy = "department",
            cascade = {CascadeType.DETACH,CascadeType.MERGE,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<Course> course;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<Student> getStudent() {
        return student;
    }

    public void setStudent(List<Student> student) {
        this.student = student;
    }


    public List<Lecture> getLecture() {
        return lecture;
    }

    public void setLecture(List<Lecture> lecture) {
        this.lecture = lecture;
    }

    public List<Course> getCourse() {
        return course;
    }

    public void setCourse(List<Course> course) {
        this.course = course;
    }

    public void addStudent(Student tempstudent){
        if(student == null){
            student = new ArrayList<>();
        }
        student.add(tempstudent);
        tempstudent.setDepartment(this);
    }
    public void addLecture(Lecture templecture){
        if(lecture == null){
            lecture = new ArrayList<>();
        }
        lecture.add(templecture);
        templecture.setDepartment(this);
    }

    @Override
    public String toString() {
        return "Department{" +
                "id=" + id +
                ", departmentName='" + departmentName + '\'' +
                ", description='" + description + '\'' +
                ", active=" + active +
                ", student=" + student +
                '}';
    }
}
