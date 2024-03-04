import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
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

  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getCourses(1, 10, '', '');
    this.validation();
    this.form.valueChanges.subscribe((value) => {
      if(value) {
        this.getCourses(
          this.currentPage,
          this.pageSize,
          this.f.search.value ?? '',
          this.f.category.value ?? ''
        );
      }
    })
  }

  public validation(): void {
    this.form = this.fb.group({
      category: [''],
      search: ['']
    })
  }

  public getCourses(currentPage: number, pageSize: number, search: string, category: string): void {
    this.courseService
      .get(currentPage, pageSize, search, category)
      .subscribe((response) => {
        this.courseList = response.body as Course[];
        let totalCount = response.headers.get('X-TOTAL-COUNT');

        this.totalCount = totalCount ? Number(totalCount) : 0;
      });
  }

  public doSearch(): void {

  }

  public handlePageEvent(e: PageEvent): void {
    this.currentPage = (e.pageIndex + 1);
    this.pageSize = e.pageSize;

    this.getCourses(1, 10, '', '');
  }

}
