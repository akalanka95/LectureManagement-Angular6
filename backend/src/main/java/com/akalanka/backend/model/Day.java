package com.akalanka.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "day")
public class Day {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String day;
    private boolean active;

    @OneToMany(mappedBy = "date",
            cascade = {CascadeType.DETACH,CascadeType.MERGE,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<TimeTable> timeTables;

    @OneToMany(mappedBy = "date",
            cascade = {CascadeType.DETACH,CascadeType.MERGE,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<TimeTableWeek> timeTablesWeek;

    public Day() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public List<TimeTable> getTimeTables() {
        return timeTables;
    }

    public void setTimeTables(List<TimeTable> timeTables) {
        this.timeTables = timeTables;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<TimeTableWeek> getTimeTablesWeek() {
        return timeTablesWeek;
    }

    public void setTimeTablesWeek(List<TimeTableWeek> timeTablesWeek) {
        this.timeTablesWeek = timeTablesWeek;
    }
}
