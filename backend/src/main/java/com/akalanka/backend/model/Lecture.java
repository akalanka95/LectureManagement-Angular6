package com.akalanka.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "lecture")
public class Lecture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY	)
    private Integer id;
    //@NotEmpty(message = "Please enter the Full Name!")
    private String fullName;
    //@NotEmpty(message = "Please enter the Address!")
    private String Address;
    //@NotEmpty(message = "Please enter the Email!")
    @Email
    private String email;
    //@NotEmpty(message = "Please enter the Contact Number!")
    private String contact;
    //@NotEmpty(message = "Please enter the Role!")
    private String role;
    private String imageUrl;
    private String code;

    @OneToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.REFRESH, CascadeType.PERSIST})
    @JoinColumn(name = "attendance_id")
    private Attendance attendance;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.REFRESH})
    @JoinColumn(name = "department_id")
    private Department department;

    @OneToMany(mappedBy = "lecture",
            cascade = {CascadeType.DETACH,CascadeType.MERGE,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<Course> course;
    @OneToMany(mappedBy = "lecture",
            cascade = {CascadeType.DETACH,CascadeType.MERGE,
                    CascadeType.REFRESH  })
    @JsonIgnore
    private List<TimeTable> timeTables;

    @OneToMany(mappedBy = "lecture",
            cascade = {CascadeType.DETACH,CascadeType.MERGE,
                    CascadeType.REFRESH  })
    @JsonIgnore
    private List<TimeTableWeek> timeTablesWeek;

    @OneToMany(mappedBy = "lecture",
            cascade = {CascadeType.DETACH,
                    CascadeType.REFRESH})
    @JsonIgnore
    private List<Message> message;


    private boolean active;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<Course> getCourse() {
        return course;
    }

    public void setCourse(List<Course> course) {
        this.course = course;
    }

    public Attendance getAttendance() {
        return attendance;
    }

    public void setAttendance(Attendance attendance) {
        this.attendance = attendance;
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

    public List<Message> getMessage() {
        return message;
    }

    public void setMessage(List<Message> message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
