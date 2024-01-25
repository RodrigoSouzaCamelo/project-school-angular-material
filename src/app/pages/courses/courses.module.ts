import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesMaterialModule } from '@app/shared/material/courses-material.module';


@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    CoursesMaterialModule
  ]
})
export class CoursesModule { }
