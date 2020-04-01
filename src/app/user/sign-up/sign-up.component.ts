import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent implements OnInit {

  user: User;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  // emailPattern = ' /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/' ;
  constructor(private userService: UserService, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    } else {
      this.user = {
        Email: '',
        Password: '',
        ConfirmPassword: '',
      };
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value).subscribe(() => {
      this.resetForm(form);
      this.router.navigate(['/login']);
    });
  }

}
