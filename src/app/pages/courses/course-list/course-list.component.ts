import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '@app/services/courses.service';
import { Category, Course } from '@app/shared/models/course';
import { EMPTY, Observable, catchError, debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private snackbar = inject(MatSnackBar);
  private courseService = inject(CoursesService);

  public courseList: Course[] = [];
  categories = Object.values(Category);
  form!: FormGroup;
  courseObservable!: Observable<any>;

  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getCourses(1, 10, '', '');
    this.validation();
    this.form.valueChanges
      .pipe(debounceTime(1500))
      .subscribe((value) => {
        if (value) {
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
    this.courseObservable = this.courseService
      .get(currentPage, pageSize, search, category)
      .pipe(
        tap((response) => {
          this.courseList = response.body as Course[];
          let totalCount = response.headers.get('X-TOTAL-COUNT');

          this.totalCount = totalCount ? Number(totalCount) : 0;
        }),
        catchError((err: string) => {
          this.snackbar.open(err, 'Close', { duration: 2000 });

          return EMPTY;
        })
      );
  }

  public doSearch(): void {
    const search = this.form.get('search')?.value;
    const category = this.form.get('category')?.value;

    if(!search) return;
    
    this.getCourses(
      this.currentPage,
      this.pageSize,
      search,
      category
    );
  }

  public handlePageEvent(e: PageEvent): void {
    this.currentPage = (e.pageIndex + 1);
    this.pageSize = e.pageSize;

    this.getCourses(1, 10, '', '');
  }

}
