/*
package com.akalanka.backend;

import com.akalanka.backend.model.Department;
import com.akalanka.backend.model.Student;
import com.akalanka.backend.repository.DepartmentRepository;
import com.akalanka.backend.repository.StudentRepository;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@DataJpaTest
public class DepartmentTest  {

    @Autowired
    private TestEntityManager testEntityManager;
    @Autowired
    private DepartmentRepository departmentRepository;

    */
/*private static AnnotationConfigApplicationContext context;

    private static DepartmentRepository departmentRepository;
    private  static StudentRepository studentRepository;*//*



   */
/*@BeforeClass
    public static void init() {
        context = new AnnotationConfigApplicationContext();
        context.scan("com.akalanka.backend");
        context.refresh();
        departmentRepository = (DepartmentRepository) context.getBean("departmentRepository");
       studentRepository = (StudentRepository) context.getBean("studentRepository");
   }*//*


    @Test
    */
/*public void add() {
        Student student1 = new Student();

        student1.setActive(true);
        student1.setAddress("23");
        student1.setContact("12");
        student1.setEmail("as");
        student1.setFullName("ak");
        student1.setRole("ad");

        Department department1 = new Department();
        department1.setDepartmentName("cissssssssssss");
        department1.setActive(true);
        department1.setDescription("adads");

        department1.add(student1);
        departmentRepository.save(department1);
        testEntityManager.persist(department1);


        //departmentRepository.save(department1);

        //student.setId(9);
        //Department department = new Department();
        //student.setDepartment(department);
        //student.setDescription(" The degree program has been designed so that the graduates could cater to the growing demand in government and private sector. ");
        //System.out.println("This is going to be : " + student);

        //studentRepository.save(student);

    }
}
    *//*
    //assertEquals("Added successfully", department, departmentRepository.save(department));

        */
/*department = new Department();

        department.setActive(true);
        department.setDepartmentName("Physical Science And Technology");
        department.setDescription(" Four degree programmes are available for the undergraduates and Mathematics, Statistics, and Management Studies are conducted as supporting tools for the program. ");
        departmentService.save(department);
        //assertEquals("Added successfully", true, departmentService.save(department));


        department = new Department();

        department.setActive(true);
        department.setDepartmentName("Sport Sciences and Physical Education");
        department.setDescription("The duration of the degree programmes are four years and at present there is a great demand for the degree programme");
        departmentService.save(department);
        //assertEquals("Added successfully", true, departmentService.save(department));


        department = new Department();

        department.setActive(true);
        department.setDepartmentName("Natural Resources");
        department.setDescription("The degree program is designed to cater to the current job market in the fields of Environmental Protection, Natural Resource Management and Conservation, Biodiversity Conservation and Management.");
        departmentService.save(department);
        //assertEquals("Added successfully", true, departmentService.save(department));


        department = new Department();

        department.setActive(true);
        department.setDepartmentName("Food Science and Technology");
        department.setDescription(" Degree program is designed to expand the understanding of the biological, microbiological, chemical, physical, sensory, nutritional, and engineering properties of food/ food commodities and their processing technologies.");
        departmentService.save(department);
        //assertEquals("Added successfully", true, departmentService.save(department));

*//*


*/
