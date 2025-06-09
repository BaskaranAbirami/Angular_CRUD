import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router) { }

  ngOnInit(): void {
    this.readStudents();
  }

  readStudents():void {
    this.studentService.getAllStudents().subscribe((students) => {
      this.students = students;
    });
  }

  addStudent(): void {
    this.router.navigate(['/add']);
  }

  editStudent(id: number): void {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteStudent(studentId: number) {
    this.studentService.removeStudent(studentId)
    .subscribe(
      response => {
        this.readStudents();
      },
      error => {
        console.log(error);
      }
    )
  }

}
