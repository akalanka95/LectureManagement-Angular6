package com.akalanka.backend.services.Imp;

import com.akalanka.backend.model.Attendance;
import com.akalanka.backend.repository.AttendanceRepository;
import com.akalanka.backend.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service("attendanceService")
public class AttendanceServiceImp implements AttendanceService {
    @Autowired
    private AttendanceRepository attendanceRepository;
    @Override
    @Transactional
    public void updateMonday(boolean actives) {
        System.out.println("This workkkkkkkk");
         attendanceRepository.updateMonday(actives);
    }
}
