import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'users', 
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) 
  }, 
  { 
    path: 'dashboard', 
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { 
    path: 'courses', 
    loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
