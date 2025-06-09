import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})

export class StudentAddComponent implements OnInit {
  student:any;
  studentAddForm:FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService
  ){}

  ngOnInit(): void {
    this.studentAddForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      stream: ['', Validators.required],
      year: ['', Validators.required],
    });
  }


  onSubmit(): void {
      this.studentService.addStudent(this.studentAddForm.value).subscribe(() => {
        this.router.navigate(['']);
      });
  }
}