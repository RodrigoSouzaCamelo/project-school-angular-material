import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '@app/services/courses.service';
import { Category, Course } from '@app/shared/models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  private courseService = inject(CoursesService);
  private fb = inject(FormBuilder)

  public courseList: Course[] = [];
  categories = Object.values(Category);
  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.getCourses();
  }

  public validation() {
    this.form = this.fb.group({
      category: ['']
    })
  }

  public getCourses(): void {
    this.courseService.get().subscribe((response: Course[]) => {
      this.courseList = response;
    })
  }

}
