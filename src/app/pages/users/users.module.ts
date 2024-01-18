import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyConquestsComponent } from './my-conquests/my-conquests.component';
import { MyDisciplinesComponent } from './my-disciplines/my-disciplines.component';
import { UsersMaterialModule } from '@app/shared/material/users-material.module';
import { SharedModule } from '@app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    UsersComponent,
    MyProfileComponent,
    MyConquestsComponent,
    MyDisciplinesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    UsersMaterialModule,
    MatButtonModule
  ]
})
export class UsersModule { }
