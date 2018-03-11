import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { fadeStateTrigger } from '../../shared/animations/fade.animation';


@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private usersServices: UsersService,
              private authSevice: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.message = new Message('danger', '');

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({type: 'success', text: 'You can login'});
        } else if (params['accessDenied']) {
          this.showMessage(({
            type: 'warning',
            text: 'You must be logged in'
          }));
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {

    const formData = this.form.value;

    this.usersServices.getUserByEmail(formData.email)
      .subscribe((user: User) => {

        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authSevice.login();
            this.router.navigate(['system']);
            {
            }
          } else {
            this.showMessage({type: 'danger', text: 'Password wrong!'});
          }
        } else {
          this.showMessage({type: 'danger', text: 'User with this email not found!'});
        }
      });
  }

}
