package com.akalanka.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "lectureHall")
public class LectureHall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY	)
    private Integer id;
    private String Name;
    private String code;
    private String description;
    private int capacity;

    @OneToMany(mappedBy = "lectureHall",
            cascade = {CascadeType.DETACH,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<TimeTable> timeTable;

    @OneToMany(mappedBy = "lectureHall",
            cascade = {CascadeType.DETACH,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<TimeTableWeek> timeTableWeek;
    public LectureHall() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public List<TimeTable> getTimeTable() {
        return timeTable;
    }

    public void setTimeTable(List<TimeTable> timeTable) {
        this.timeTable = timeTable;
    }

    public List<TimeTableWeek> getTimeTableWeek() {
        return timeTableWeek;
    }

    public void setTimeTableWeek(List<TimeTableWeek> timeTableWeek) {
        this.timeTableWeek = timeTableWeek;
    }
}
