import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { UsersService } from '../../shared/services/users.service';


@Component({
  selector: 'wfm-registation',
  templateUrl: './registation.component.html',
  styleUrls: ['./registation.component.scss']
})
export class RegistationComponent implements OnInit {

  form: FormGroup;
  message: Message;
  user: User;

  constructor(private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit() {

    this.message = new Message('', '');

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.isBusyEmail.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.required, Validators.requiredTrue])
    });
  }

  onSubmit() {

    const {email, password, name} = this.form.value;
    this.user = new User(name, password, email);

    this.usersService.createNewUser(this.user)
      .subscribe((user: User) => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      });
  }

  isBusyEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user) {
            return resolve({isBusy: true});
          } else {
            return resolve(null);
          }
        });
    });
  }
}
