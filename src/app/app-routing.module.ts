import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListComponent} from '../app/task-management/task-list/task-list.component';
import {DetailsComponent} from '../app/details/details.component';
import { SignUpComponent } from '../app/user/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { User } from './shared/user.model';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {AuthGuard} from './auth.guard';

export const routes: Routes = [
  {path: 'task', component: TaskListComponent, canActivate: [AuthGuard]},
  {path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard] },
  {path: 'register', component: UserComponent,
    children: [{path: '', component: SignUpComponent}]},
  {path: 'login', component: UserComponent,
    children: [{path: '', component: SignInComponent}]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
