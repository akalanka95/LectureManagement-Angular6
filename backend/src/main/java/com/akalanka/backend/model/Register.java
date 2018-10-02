package com.akalanka.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "register")
public class Register {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY	)
    private Integer id;
    private String number;
    @ManyToOne(cascade = {CascadeType.DETACH,
            CascadeType.REFRESH})
    @JoinColumn(name = "semester_id")
    private Semester semester;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }
}

