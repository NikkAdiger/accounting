import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseApi } from '../../../shared/core/base-api';
import { WfmEvent } from '../models/event.models';


@Injectable()
export class EventsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: WfmEvent): Observable<WfmEvent> {

    return this.postBaseApi('events', event);
  }

  getEvents(): Observable<WfmEvent[]> {
    return this.getBaseApi('events');
  }

  getEventById(id: string): Observable<WfmEvent> {
    return this.getBaseApi(`events/${id}`);
  }
}
