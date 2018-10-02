package com.akalanka.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "week")
public class Week {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY	)
    private Integer id;
    private String week;
    private boolean active;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}

