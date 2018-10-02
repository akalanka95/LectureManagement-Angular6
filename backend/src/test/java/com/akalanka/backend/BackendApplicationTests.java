///*
//package com.akalanka.backend;
//
//import com.akalanka.backend.model.Department;
//import com.akalanka.backend.model.Student;
//import com.akalanka.backend.repository.DepartmentRepository;
//import com.akalanka.backend.services.UserService;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@DataJpaTest
//@Transactional
//public class BackendApplicationTests extends AbstractTransactionalJUnit4SpringContextTests {
//
//	@Autowired
//	private TestEntityManager testEntityManager;
//	@Autowired
//	private DepartmentRepository departmentRepository;
//	@PersistenceContext
//	EntityManager entityManager;
//
//
//	@Test
//	@Rollback(false)
//	public void contextLoads() {
//		Student student1 = new Student();
//
//		student1.setActive(true);
//		student1.setAddress("23");
//		student1.setContact("12");
//		student1.setEmail("as");
//		student1.setFullName("ak");
//		student1.setRole("ad");
//
//		Department department1 = new Department();
//		department1.setDepartmentName("pst");
//		department1.setActive(true);
//		department1.setDescription("adadsbvbvgvgvgvg");
//
//		Department department2 = new Department();
//		department2.setDepartmentName("psasas");
//		department2.setActive(true);
//		department2.setDescription("pppadadsbvbvgvgvgvg");
//
//		department1.addStudent(student1);
//		entityManager.flush();
//		departmentRepository.save(department1);
//		entityManager.flush();
//		departmentRepository.save(department2);
//		entityManager.flush();
//		//Department d1 = testEntityManager.persist(department1);
//		Department d2 = departmentRepository.findOne(2);
//		System.out.println(d2.toString());
//		//assert(d2).equals(d1);
//	}
//
//}
//*/
