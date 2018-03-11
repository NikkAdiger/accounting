import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BillSevice } from '../shared/services/bill.sevice';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { WfmEvent } from '../shared/models/event.models';


@Component({
  selector: 'wfm-planing-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded;
  s1: Subscription;
  bill: Bill;
  categories: Category[] = [];
  events: WfmEvent[] = [];

  constructor(private  billService: BillSevice,
              private categoryService: CategoriesService,
              private eventService: EventsService) {
  }

  ngOnInit() {

    this.s1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Bill, Category[], WfmEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  getCategoryCost(cat: Category): number {

    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');

    return catEvents.reduce((total, e) => {
      return total += e.amount;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat) / cat.capacity);

    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {

    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent > 90 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
