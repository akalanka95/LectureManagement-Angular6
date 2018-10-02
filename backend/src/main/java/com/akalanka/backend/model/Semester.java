package com.akalanka.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "semester")
public class Semester {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY	)
    private Integer id;
    private String semesterName;

    @OneToMany(mappedBy = "semester",
            cascade = {CascadeType.DETACH,CascadeType.MERGE,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<Student> student;

    @OneToMany(mappedBy = "semester",
            cascade = {CascadeType.DETACH,CascadeType.MERGE,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<Course> course;

    @OneToMany(mappedBy = "semester",
            cascade = {CascadeType.DETACH,CascadeType.MERGE,
                    CascadeType.REFRESH  })
    @JsonIgnore
    private List<TimeTable> timeTables;

    @OneToMany(mappedBy = "semester",
            cascade = {CascadeType.DETACH,CascadeType.MERGE,
                    CascadeType.REFRESH  })
    @JsonIgnore
    private List<TimeTableWeek> timeTablesWeek;

    @OneToMany(mappedBy = "semester",
            cascade = {CascadeType.DETACH,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<Register> register;

    @OneToMany(mappedBy = "semester",
            cascade = {CascadeType.DETACH,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<Result> result;


    public Semester() {
    }

    public Semester(String semesterName) {
        this.semesterName = semesterName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSemesterName() {
        return semesterName;
    }

    public void setSemesterName(String semesterName) {
        this.semesterName = semesterName;
    }

    public List<Student> getStudent() {
        return student;
    }

    public void setStudent(List<Student> student) {
        this.student = student;
    }

    public List<Course> getCourse() {
        return course;
    }

    public void setCourse(List<Course> course) {
        this.course = course;
    }

    public List<TimeTable> getTimeTables() {
        return timeTables;
    }

    public void setTimeTables(List<TimeTable> timeTables) {
        this.timeTables = timeTables;
    }

    public List<TimeTableWeek> getTimeTablesWeek() {
        return timeTablesWeek;
    }

    public void setTimeTablesWeek(List<TimeTableWeek> timeTablesWeek) {
        this.timeTablesWeek = timeTablesWeek;
    }

    public List<Register> getRegister() {
        return register;
    }

    public void setRegister(List<Register> register) {
        this.register = register;
    }

    public List<Result> getResult() {
        return result;
    }

    public void setResult(List<Result> result) {
        this.result = result;
    }
}
