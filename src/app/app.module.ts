import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TaskService} from '../app/shared/task.service';
import {MaterialModule} from '../app/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {routes} from './app-routing.module';
import {AuthGuard} from './auth.guard';
import {AuthInterceptor} from './auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { PopupComponent } from './task-management/popup/popup.component';
import { TaskListComponent } from './task-management/task-list/task-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { SignUpComponent } from '../app/user/sign-up/sign-up.component';
import { UserService } from './shared/user.service';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskManagementComponent,
    PopupComponent,
    TaskListComponent,
    DetailsComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,

  ],
  imports: [
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes),
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [TaskService, MatDatepickerModule, PopupComponent, HttpClientModule, UserService, AuthGuard,
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [TaskManagementComponent, PopupComponent, TaskListComponent, SignUpComponent, SignInComponent]
})
export class AppModule { }
