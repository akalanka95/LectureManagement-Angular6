package com.akalanka.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "result")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY	)
    private Integer id;
    private String indexNo;
    private String year;
    @ManyToOne(cascade = {CascadeType.DETACH,
            CascadeType.REFRESH})
    @JoinColumn(name = "semester_id")
    private Semester semester;
    @ManyToOne(cascade = {CascadeType.DETACH,
            CascadeType.REFRESH})
    @JoinColumn(name = "course_id")
    private Course course;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(String indexNo) {
        this.indexNo = indexNo;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
