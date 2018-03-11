import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BaseApi } from '../../../shared/core/base-api';
import { Bill } from '../models/bill.model';

@Injectable()

export class BillSevice extends BaseApi {

  constructor(public http: HttpClient) {

    super(http);
  }

  getBill(): Observable<any> {

    return this.getBaseApi('bill');

  }

  updateBill(bill: Bill): Observable<Bill> {

    return this.putBaseApi('bill', bill);
  }

  getCurrency(base: string = 'RUB'): Observable<any> {

    return this.http.get(`https://api.fixer.io/latest?base=${base}`);

  }

}
