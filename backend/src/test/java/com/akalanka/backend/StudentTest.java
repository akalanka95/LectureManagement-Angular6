/*
package com.akalanka.backend;

import org.junit.BeforeClass;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@SpringBootTest
public class StudentTest {
    private static AnnotationConfigApplicationContext context;

    private static DepartmentService departmentService;
    private static CourseService courseService;
    private  static LectureService lectureService;
    private static SemesterService semesterService;

    private Course course;
    private Department department;
    private Lecture lecture;
    private Semester semester;

    @BeforeClass
    public static void init() {
        context = new AnnotationConfigApplicationContext();
        context.scan("com.akalanka.springangular.lecturemanagement");
        context.refresh();
        courseService = (CourseService) context.getBean("courseService");
        lectureService = (LectureService) context.getBean("lectureService");
        departmentService = (DepartmentService) context.getBean("departmentService");
        semesterService = (SemesterService) context.getBean("semesterService");

    }
}
*/
