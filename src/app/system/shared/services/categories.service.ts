import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';


@Injectable()

export class CategoriesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addCategory(category: Category): Observable<Category> {

    return this.postBaseApi('categories', category);

  }

  changeCategory(category: Category): Observable<Category> {

    return this.putBaseApi('categories', category);

  }

  getCategory(name: string): Observable<Category> {

    return this.getBaseApi('categories');

  }

  getCategories(): Observable<Category[]> {
    return this.getBaseApi('categories');
  }

  updateCategory(category: Category): Observable<Category> {

    return this.putBaseApi(`categories/${category.id}`, category);
  }

  getCategoryById(id: number): Observable<Category> {

    return this.getBaseApi(`categories/${id}`);
  }

}
