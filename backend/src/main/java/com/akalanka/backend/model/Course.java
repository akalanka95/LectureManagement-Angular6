package com.akalanka.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY	)
    private Integer id;

    private String courseCode;
    private String courseName;
    private Integer courseCredit;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.REFRESH})
    @JoinColumn(name = "semester_id")
    private Semester semester;

    @ManyToOne(cascade = {CascadeType.DETACH,
            CascadeType.REFRESH})
    @JoinColumn(name = "department_id")
    private Department department;

    private String description;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.REFRESH})
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @OneToMany(mappedBy = "course",
            cascade = {CascadeType.DETACH,
                    CascadeType.REFRESH  })
    @JsonIgnore
    private List<TimeTable> timeTables;
    @OneToMany(mappedBy = "course",
            cascade = {CascadeType.DETACH,
                    CascadeType.REFRESH  })
    @JsonIgnore
    private List<TimeTableWeek> timeTablesWeek;

    @OneToMany(mappedBy = "course",
            cascade = {CascadeType.DETACH,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<Result> result;

    public Course(String courseCode, String courseName,Semester semester, Department department, String description, Lecture lecture) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.semester = semester;
        this.department = department;
        this.description = description;
        this.lecture = lecture;
    }

    public Course() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Lecture getLecture() {
        return lecture;
    }

    public void setLecture(Lecture lecture) {
        this.lecture = lecture;
    }

    public List<TimeTable> getTimeTables() {
        return timeTables;
    }

    public void setTimeTables(List<TimeTable> timeTables) {
        this.timeTables = timeTables;
    }

    public Integer getCourseCredit() {
        return courseCredit;
    }

    public void setCourseCredit(Integer courseCredit) {
        this.courseCredit = courseCredit;
    }

    public List<TimeTableWeek> getTimeTablesWeek() {
        return timeTablesWeek;
    }

    public void setTimeTablesWeek(List<TimeTableWeek> timeTablesWeek) {
        this.timeTablesWeek = timeTablesWeek;
    }

    public List<Result> getResult() {
        return result;
    }

    public void setResult(List<Result> result) {
        this.result = result;
    }
}
