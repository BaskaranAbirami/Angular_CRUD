import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentEditForm: FormGroup;
  studentId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
  this.studentEditForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dob: ['', Validators.required],
    stream: ['', Validators.required],
    year: ['', Validators.required],
  });

  // Get student ID from route and load student data
  this.studentId = this.route.snapshot.paramMap.get('id');
  if (this.studentId) {
    this.studentService.getStudent(this.studentId).subscribe(student => {
      // Format DOB to 'YYYY-MM-DD' for input[type="date"]
      const formattedDob = new Date(student.dob).toISOString().split('T')[0];

      this.studentEditForm.patchValue({
        name: student.name,
        email: student.email,
        dob: formattedDob,
        stream: student.stream,
        year: student.year,
      });
    });
  }
}


  onSubmit(): void {
    if (this.studentEditForm.valid) {
      this.studentService.editStudent(this.studentId, this.studentEditForm.value).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
}
