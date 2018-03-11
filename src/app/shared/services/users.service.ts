import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { isUndefined } from 'util';
import { BaseApi } from '../core/base-api';

@Injectable()

export class UsersService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<any> {

    return this.getBaseApi(`users?email=${email}`)
      .map((response: Response) => response[0] ? response[0] : isUndefined(response));
  }

  createNewUser(user: User): Observable<any> {

    return this.postBaseApi('users', user);

  }

}
