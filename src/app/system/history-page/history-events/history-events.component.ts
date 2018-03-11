import { Component, Input, OnInit } from '@angular/core';

import { Category } from '../../shared/models/category.model';
import { WfmEvent } from '../../shared/models/event.models';

@Component({
  selector: 'wfm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: WfmEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'Amount';
  searchField = 'amount';

  constructor() {
  }

  ngOnInit() {
  }

  getNameCategory(e: WfmEvent): string {

    return this.categories.find(c => c.id === +e.category).name;

  }

  getEventClass(e: WfmEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Amount',
      date: 'Date',
      category: 'Category',
      type: 'Type'
    };

    this.searchPlaceholder = namesMap[field];
    this.searchField = field;

  }

}
