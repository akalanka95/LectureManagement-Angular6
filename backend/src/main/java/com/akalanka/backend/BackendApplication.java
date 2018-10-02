package com.akalanka.backend;


import com.akalanka.backend.config.GmailInbox;
import com.akalanka.backend.config.SecurityUtility;
import com.akalanka.backend.model.*;
import com.akalanka.backend.model.security.Role;
import com.akalanka.backend.model.security.UserRole;
import com.akalanka.backend.repository.*;
import com.akalanka.backend.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;
	@Autowired
	private DepartmentService departmentService;
	@Autowired
	private SemesterService semesterService;
	@Autowired
	private LectureService lectureService;
	@Autowired
	private StudentService studentService;
	@Autowired
	private  CourseService courseService;
	@Autowired
	private DayService dayService;
	@Autowired
	private TimeService timeService;
	@Autowired
	private  LectureHallService lectureHallService;
	@Autowired
	private TimeTableService timeTableService;
	@Autowired
	private AttendanceRepository attendanceRepository;
	@Autowired
	private WeekRepository weekRepository;
	@Autowired
	private MessageRepository messageRepository;
	@Autowired
	private RegisterRepository indexRepository;
	@Autowired
	private ResultRepository resultRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		GmailInbox gmail = new GmailInbox();
		gmail.read();

		User user1 = new User();
		user1.setFirstName("John");
		user1.setLastName("Adams");
		user1.setUsername("j");
		user1.setPassword(SecurityUtility.passwordEncoder().encode("p"));
		user1.setEmail("JAdams@gmail.com");
		Set<UserRole> userRoles = new HashSet<>();
		Role role1 = new Role();
		role1.setRoleId(1);
		role1.setName("ROLE_USER");
		userRoles.add(new UserRole(user1, role1));

		userService.createUser(user1, userRoles);

		userRoles.clear();

		User user2 = new User();
		user2.setFirstName("Admin");
		user2.setLastName("Admin");
		user2.setUsername("admin");
		user2.setPassword(SecurityUtility.passwordEncoder().encode("p"));
		user2.setEmail("Admin@gmail.com");
		Role role2 = new Role();
		role2.setRoleId(0);
		role2.setName("ROLE_ADMIN");
		userRoles.add(new UserRole(user2, role2));

		userService.createUser(user2, userRoles);

		//department
		/*Department department1 = new Department();
		department1.setDepartmentName("cis");
		department1.setActive(true);
		department1.setDescription("adads");
		departmentService.save(department1);*/

		Department department2 = new Department();
		department2.setActive(true);
		department2.setDepartmentName("Computing and Information System(CIS)");
		department2.setDescription(" The degree program has been designed so that the graduates could cater to the growing demand in government and private sector. ");
		departmentService.save(department2);
		//Semester
		Semester semester1 = new Semester("Year 1");
		semesterService.save(semester1);
		Semester semester2 = new Semester("Year 2");
		semesterService.save(semester2);
		Semester semester3 = new Semester("Year 3");
		semesterService.save(semester3);
		Semester semester4 = new Semester("Year 4");
		semesterService.save(semester4);

		// Week
		Week w1 = new Week();
		w1.setActive(true);
		w1.setWeek("Week 1");
		weekRepository.save(w1);

		Week w2 = new Week();
		w2.setActive(false);
		w2.setWeek("Week 2");
		weekRepository.save(w2);

		Week w3 = new Week();
		w3.setActive(false);
		w3.setWeek("Week 3");
		weekRepository.save(w3);

		Week w4 = new Week();
		w4.setActive(false);
		w4.setWeek("Week 4");
		weekRepository.save(w4);

		Week w5 = new Week();
		w5.setActive(false);
		w5.setWeek("All Weeks");
		weekRepository.save(w5);

		//day
		Day d1 = new Day();
		d1.setDay("Monday");
		d1.setActive(true);
		dayService.save(d1);

		Day d2 = new Day();
		d2.setDay("Tuesday");
		d2.setActive(true);
		dayService.save(d2);

		Day d3 = new Day();
		d3.setDay("Wednesday");
		d3.setActive(true);
		dayService.save(d3);

		Day d4 = new Day();
		d4.setDay("Thursday");
		d4.setActive(true);
		dayService.save(d4);

		Day d5 = new Day();
		d5.setDay("Friday");
		d5.setActive(true);
		dayService.save(d5);

		//Time
		Time time18 = new Time();
		time18.setTime("8:00");
		timeService.save(time18);

		Time time19 = new Time();
		time19.setTime("8:30");
		timeService.save(time19);

		Time time20 = new Time();
		time20.setTime("9:00");
		timeService.save(time20);
        Time time21 = new Time();
        time21.setTime("9:30");
        timeService.save(time21);
        Time time22 = new Time();
        time22.setTime("10:00");
        timeService.save(time22);
        Time time23 = new Time();
        time23.setTime("10:30");
        timeService.save(time23);
        Time time24 = new Time();
        time24.setTime("11:00");
        timeService.save(time24);
        Time time25 = new Time();
        time25.setTime("11:30");
        timeService.save(time25);
        Time time26 = new Time();
        time26.setTime("12:00");
        timeService.save(time26);
        Time time27 = new Time();
        time27.setTime("12:30");
        timeService.save(time27);
        Time time28 = new Time();
        time28.setTime("13:00");
        timeService.save(time28);
        Time time29 = new Time();
        time29.setTime("13:30");
        timeService.save(time29);
        Time time30 = new Time();
        time30.setTime("14:00");
        timeService.save(time30);
		Time time31 = new Time();
		time31.setTime("14:30");
		timeService.save(time31);
		Time time32 = new Time();
		time32.setTime("15:00");
		timeService.save(time32);
		Time time33 = new Time();
		time33.setTime("15:30");
		timeService.save(time33);
		Time time34 = new Time();
		time34.setTime("16:00");
		timeService.save(time34);
		Time time35 = new Time();
		time35.setTime("16:30");
		timeService.save(time35);
		Time time36 = new Time();
		time36.setTime("17:00");
		timeService.save(time36);

		//attendance
		Attendance attendance = new Attendance();
		attendance.setMonday(true);
		attendance.setTuesday(true);
		attendance.setWednesday(true);
		attendance.setThursday(true);
		attendance.setFriday(true);

		Attendance attendance1 = new Attendance();
		attendance1.setMonday(true);
		attendance1.setTuesday(true);
		attendance1.setWednesday(true);
		attendance1.setThursday(true);
		attendance1.setFriday(true);

		Attendance attendance2 = new Attendance();
		attendance2.setMonday(true);
		attendance2.setTuesday(true);
		attendance2.setWednesday(true);
		attendance2.setThursday(true);
		attendance2.setFriday(true);

		Attendance attendance3 = new Attendance();
		attendance3.setMonday(true);
		attendance3.setTuesday(true);
		attendance3.setWednesday(true);
		attendance3.setThursday(true);
		attendance3.setFriday(true);

		Attendance attendance4 = new Attendance();
		attendance4.setMonday(true);
		attendance4.setTuesday(true);
		attendance4.setWednesday(true);
		attendance4.setThursday(true);
		attendance4.setFriday(true);

		//LectureHall
		LectureHall lectureHall = new LectureHall();
		lectureHall.setCode("LT-104");
		lectureHall.setDescription("A specific lecture hall in the faculty");
		lectureHall.setName("LT-104");
		lectureHall.setCapacity(150);
		lectureHallService.save(lectureHall);

		LectureHall lectureHall1 = new LectureHall();
		lectureHall1.setCode("LT-105");
		lectureHall1.setDescription("A specific lecture hall in the faculty");
		lectureHall1.setName("LT-105");
		lectureHall1.setCapacity(150);
		lectureHallService.save(lectureHall1);

		LectureHall lectureHall2 = new LectureHall();
		lectureHall2.setCode("LT-202");
		lectureHall2.setDescription("A lecture hall inside the faculty");
		lectureHall2.setName("LT-202");
		lectureHall2.setCapacity(50);
		lectureHallService.save(lectureHall2);

		LectureHall lectureHall3 = new LectureHall();
		lectureHall3.setCode("Z-9");
		lectureHall3.setDescription("Old lecture hall");
		lectureHall3.setName("Z-9");
		lectureHall3.setCapacity(75);
		lectureHallService.save(lectureHall3);

		LectureHall lectureHall4 = new LectureHall();
		lectureHall4.setCode("NLH");
		lectureHall4.setDescription("New lecture hall");
		lectureHall4.setName("NLH");
		lectureHall4.setCapacity(100);
		lectureHallService.save(lectureHall4);

		LectureHall lectureHall5 = new LectureHall();
		lectureHall5.setCode("CIS Lab");
		lectureHall5.setDescription("CIS Computer Laboratory");
		lectureHall5.setName("CIS Lab");
		lectureHall5.setCapacity(80);
		lectureHallService.save(lectureHall5);

		//lecturer
		Lecture lecture = new Lecture();
		lecture.setAddress("colombo");
		lecture.setContact("+94453454527");
		lecture.setEmail("nirmaliw@appsc.sab.ac.lk");
		lecture.setFullName("Dr.M.Nirmali Wicramaratne");
		lecture.setRole("Senior Lecturer");
		lecture.setActive(true);
		lecture.setDepartment(department2);
		lecture.setAttendance(attendance);
		lectureService.save(lecture);

		Lecture lecture2 = new Lecture();
		lecture2.setAddress("Kurunegala");
		lecture2.setContact("+94714433425");
		lecture2.setEmail("malavisarath@appsc.sab.ac.lk");
		lecture2.setFullName("Mr.S.Malavipathirana");
		lecture2.setRole("Lecturer");
		lecture2.setActive(true);
		lecture2.setDepartment(department2);
		lecture2.setAttendance(attendance1);
		lectureService.save(lecture2);

		/*Lecture lecture3 = new Lecture();
		lecture3.setAddress("Kurunegala");
		lecture3.setContact("+94714433425");
		lecture3.setEmail("malavisarath@appsc.sab.ac.lk");
		lecture3.setFullName("Mr.S.Jayaweera");
		lecture3.setRole("Lecturer");
		lecture3.setActive(true);
		lecture3.setDepartment(department2);
		lecture3.setAttendance(attendance2);
		lectureService.save(lecture3);

		Lecture lecture4 = new Lecture();
		lecture4.setAddress("Ratnapura");
		lecture4.setContact("+94453454527");
		lecture4.setEmail("jatalathek@appsc.sab.ac.lk");
		lecture4.setFullName("Mr.Jayalath B.Ekanayake");
		lecture4.setRole("Head of the department");
		lecture4.setActive(true);
		lecture4.setDepartment(department2);
		lecture4.setAttendance(attendance3);
		lectureService.save(lecture4);

		Lecture lecture5 = new Lecture();
		lecture5.setAddress("Colombo");
		lecture5.setContact("+94717851500");
		lecture5.setEmail("priyan@appsc.sab.ac.lk");
		lecture5.setFullName("Mr.S.Vasanthapriyan");
		lecture5.setRole("Senior Lecturer");
		lecture5.setActive(true);
		lecture5.setDepartment(department2);
		lecture5.setAttendance(attendance4);
		lectureService.save(lecture5);*/


		//Student
		Student student1 = new Student();
		student1.setActive(true);
		student1.setAddress("23");
		student1.setContact("12");
		student1.setEmail("as");
		student1.setFullName("ak");
		student1.setRole("ad");
		student1.setDepartment(department2);
		student1.setSemester(semester1);
		studentService.save(student1);

		//message
		Message m1 = new Message();
		m1.setDate("2018/01/03");
		m1.setTime("8.30am");
		m1.setType("send");
		m1.setMessage("Hai Good Morning");
		m1.setLecture(lecture);
		messageRepository.save(m1);


		Message m2 = new Message();
		m2.setDate("2018/01/03");
		m2.setTime("9.30am");
		m2.setType("send");
		m2.setMessage("Hai Good Morning man");
		m2.setLecture(lecture);
		messageRepository.save(m2);

		Message m3 = new Message();
		m3.setDate("2018/01/03");
		m3.setTime("10.30am");
		m3.setType("received");
		m3.setMessage("Same to You");
		m3.setLecture(lecture);
		messageRepository.save(m3);

		Message m4 = new Message();
		m4.setDate("2018/01/03");
		m4.setTime("10.30am");
		m4.setType("received");
		m4.setMessage("I am Lecture 2");
		m4.setLecture(lecture2);
		messageRepository.save(m4);

		//Course
		Course course = new Course();
		course.setCourseCode("IS22221");
		course.setCourseName("Operating Systems");
		course.setDescription("This is regarding Operating System");
		course.setDepartment(department2);
		course.setLecture(lecture);
		course.setSemester(semester1);
		courseService.save(course);

		Course course1 = new Course();
		course1.setCourseCode("IS3000");
		course1.setCourseName("Agile Systems");
		course1.setDescription("This is regarding Operating System");
		course1.setDepartment(department2);
		course1.setLecture(lecture2);
		course1.setSemester(semester1);
		courseService.save(course1);

		Course course2 = new Course();
		course2.setCourseCode("IS3001");
		course2.setCourseName("Java");
		course2.setDescription("This is regarding Operating System");
		course2.setDepartment(department2);
		course2.setLecture(lecture2);
		course2.setSemester(semester1);
		courseService.save(course2);

		Course course3 = new Course();
		course3.setCourseCode("IS3002");
		course3.setCourseName("Angular");
		course3.setDescription("This is regarding Operating System");
		course3.setDepartment(department2);
		course3.setLecture(lecture2);
		course3.setSemester(semester1);
		courseService.save(course3);

		//TimeTable
		TimeTable timeTable = new TimeTable();
		timeTable.setActive(true);
		timeTable.setState("old");
		timeTable.setCourse(course);
		timeTable.setSemester(semester1);
		timeTable.setDate(d1);
		timeTable.setStartTime(time18);
		timeTable.setEndTime(time21);
		timeTable.setLecture(lecture);
		timeTable.settWeek(true);
		timeTable.setnWeek(true);
		timeTable.setLectureHall(lectureHall);
		timeTableService.save(timeTable);

		TimeTable timeTable1 = new TimeTable();
		timeTable1.setActive(true);
		timeTable1.setState("old");
		timeTable1.setCourse(course1);
		timeTable1.setSemester(semester1);
		timeTable1.setDate(d1);
		timeTable1.setStartTime(time22);
		timeTable1.setEndTime(time25);
		timeTable1.setLecture(lecture2);
		timeTable1.settWeek(true);
		timeTable1.setnWeek(false);
		timeTable1.setLectureHall(lectureHall1);
		timeTableService.save(timeTable1);

		TimeTable timeTable2 = new TimeTable();
		timeTable2.setActive(true);
		timeTable2.setState("old");
		timeTable2.setCourse(course2);
		timeTable2.setSemester(semester1);
		timeTable2.setDate(d1);
		timeTable2.setStartTime(time26);
		timeTable2.setEndTime(time29);
		timeTable2.setLecture(lecture2);
		timeTable2.settWeek(false);
		timeTable2.setnWeek(true);
		timeTable2.setLectureHall(lectureHall2);
		timeTableService.save(timeTable2);

		TimeTable timeTable3 = new TimeTable();
		timeTable3.setActive(true);
		timeTable3.setState("old");
		timeTable3.setCourse(course3);
		timeTable3.setSemester(semester1);
		timeTable3.setDate(d1);
		timeTable3.setStartTime(time31);
		timeTable3.setEndTime(time34);
		timeTable3.setLecture(lecture2);
		timeTable3.settWeek(false);
		timeTable3.setnWeek(false);
		timeTable3.setLectureHall(lectureHall3);
		timeTableService.save(timeTable3);

		/*TimeTable timeTable3 = new TimeTable();
		timeTable3.setActive(true);
		timeTable3.setState("new");
		timeTable3.setCourse(course);
		timeTable3.setSemester(semester1);
		timeTable3.setDate(d1);
		timeTable3.setStartTime(time26);
		timeTable3.setEndTime(time28);
		timeTable3.setLecture(lecture);
		timeTable3.settWeek(false);
		timeTable3.setnWeek(true);
		timeTableService.save(timeTable3);*/

		Register n1 = new Register();
		n1.setNumber("2039");
		n1.setSemester(semester1);
		indexRepository.save(n1);

		Register n2 = new Register();
		n2.setNumber("EP2030");
		n2.setSemester(semester1);
		indexRepository.save(n2);

		Register n3 = new Register();
		n3.setNumber("EP2031");
		n3.setSemester(semester1);
		indexRepository.save(n3);

		Register n4 = new Register();
		n4.setNumber("EP2030");
		n4.setSemester(semester1);
		indexRepository.save(n4);

		Register n5 = new Register();
		n5.setNumber("EP2030");
		n5.setSemester(semester1);
		indexRepository.save(n5);

		Result r1 = new Result();
		r1.setIndexNo("EP2039");
		r1.setCourse(course);
		r1.setSemester(semester1);
		r1.setYear("2015");
		resultRepository.save(r1);

	}

}
