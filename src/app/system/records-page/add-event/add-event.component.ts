import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { WfmEvent } from '../../shared/models/event.models';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { BillSevice } from '../../shared/services/bill.sevice';
import { Bill } from '../../shared/models/bill.model';
import { Message } from '../../../shared/models/message.model';


@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories;

  sub1: Subscription;
  sub2: Subscription;

  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Outcome'}
  ];

  balance = 0;
  message: Message;

  constructor(private eventservice: EventsService,
              private billservice: BillSevice) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm) {

    let {amount} = form.value;
    const {description, category, type} = form.value;

    if (amount < 0) {
      amount *= -1;
    }

    const event = new WfmEvent(
      type, amount, +category,
      moment().format('DD.MM.YYYY HH:mm:ss'), description
    );

    this.sub1 = this.billservice.getBill().subscribe((bill: Bill) => {

      if (type === 'outcome') {
        if (amount > bill.value) {
          this.showMessage('There are not enough funds on the account');
          return;
        } else {
          this.balance = bill.value - amount;
        }
      } else {
        this.balance = bill.value + amount;
      }

      this.sub2 = this.billservice.updateBill({value: this.balance, currency: bill.currency})
        .mergeMap(() => this.eventservice.addEvent(event))
        .subscribe(() => {
          form.setValue({
            amount: 0,
            description: ' ',
            category: 1,
            type: 'outcome'
          });
        });
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
