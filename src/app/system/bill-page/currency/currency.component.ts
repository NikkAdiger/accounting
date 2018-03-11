import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'wfm-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  @Input() currency;
  @Output() res = new EventEmitter();

  currencies: string [] = ['USD', 'EUR'];
  multiplicity = 1;
  list = [1, 10, 100, 1000];


  constructor() {
  }

  ngOnInit() {

  }

  exp() {
    this.res.emit(this.multiplicity);
  }
}
