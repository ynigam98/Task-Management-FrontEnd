import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { UserService } from '../app/shared/user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }
    debugger;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.headers.get('No-Auth') === 'True') {
          return next.handle(req.clone()).pipe(
            tap(null,
              error => {
                if (error.status === 400) {
                  alert('User Already Exists! Please Login!');
                }
              })
            );
          }
        if (localStorage.getItem('userToken') != null) {
          // console.log(localStorage.getItem('userToken'));
          const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
            });
          return next.handle(clonedreq)
            .pipe(
              tap(null,
              error => {
                if (error.status === 401 || error.status === 500 || error.status === 400 ) {
                  this.router.navigate(['/login']);
                }
              })
            );
        } else {
            this.router.navigateByUrl('/login');
        }
    }

  }
