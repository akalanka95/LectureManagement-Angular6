package com.akalanka.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "timeTable")
public class TimeTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY	)
    private int id;
    private boolean active;
    private String state;
    private boolean tWeek;
    private boolean nWeek;

    @ManyToOne(cascade = {CascadeType.DETACH,
            CascadeType.REFRESH})
    @JoinColumn(name = "course_id")
    private Course course;
    @ManyToOne(cascade = {CascadeType.DETACH,
            CascadeType.REFRESH })
    @JoinColumn(name = "semester_id")
    private Semester semester;
    @ManyToOne(cascade = {CascadeType.DETACH,
            CascadeType.REFRESH })
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;
    @ManyToOne(cascade = {CascadeType.DETACH,
            CascadeType.REFRESH})
    @JoinColumn(name = "startTime_id")
    private Time startTime;
    @ManyToOne(cascade = {CascadeType.DETACH,
            CascadeType.REFRESH})
    @JoinColumn(name = "endTime_id")
    private Time endTime;
    @ManyToOne(cascade = {CascadeType.DETACH,
            CascadeType.REFRESH})
    @JoinColumn(name = "day_id")
    private Day date;
    @ManyToOne(cascade = {CascadeType.DETACH,
            CascadeType.REFRESH})
    @JoinColumn(name = "lectureHall_id")
    private LectureHall lectureHall;

    public TimeTable() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public Time getEndTime() {
        return endTime;
    }

    public void setEndTime(Time endTime) {
        this.endTime = endTime;
    }

    public Day getDate() {
        return date;
    }

    public void setDate(Day date) {
        this.date = date;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public Lecture getLecture() {
        return lecture;
    }

    public void setLecture(Lecture lecture) {
        this.lecture = lecture;
    }

    public boolean istWeek() {
        return tWeek;
    }

    public void settWeek(boolean tWeek) {
        this.tWeek = tWeek;
    }

    public boolean isnWeek() {
        return nWeek;
    }

    public void setnWeek(boolean nWeek) {
        this.nWeek = nWeek;
    }

    public LectureHall getLectureHall() {
        return lectureHall;
    }

    public void setLectureHall(LectureHall lectureHall) {
        this.lectureHall = lectureHall;
    }

}
