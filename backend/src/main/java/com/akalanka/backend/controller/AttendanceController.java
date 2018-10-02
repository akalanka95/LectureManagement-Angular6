package com.akalanka.backend.controller;

import com.akalanka.backend.model.Attendance;
import com.akalanka.backend.model.Day;
import com.akalanka.backend.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/attendances")
public class AttendanceController {
    @Autowired
    private AttendanceService attendanceService;

    @RequestMapping("/updateMonday/{active}")
    public void updateMonday(@PathVariable("active") boolean actives){
        System.out.println("Comes to the controller");
          attendanceService.updateMonday(actives);
    }
}
