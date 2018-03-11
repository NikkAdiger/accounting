import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { WfmEvent } from '../../shared/models/event.models';
import { Category } from '../../shared/models/category.model';


@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: WfmEvent;
  category: Category;
  isLoaded = false;
  s1: Subscription;

  constructor(private route: ActivatedRoute,
              private eventService: EventsService,
              private categoryService: CategoriesService) {
  }

  ngOnInit() {

    this.s1 = this.route.params
      .mergeMap((params: Params) => this.eventService.getEventById(params.id))
      .mergeMap((event: WfmEvent) => {
        this.event = event;
        return this.categoryService.getCategoryById(this.event.category);
      })
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  getClassColor() {
    return this.event.type === 'income' ? 'card-success' : 'card-danger';
  }

  ngOnDestroy(): void {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
