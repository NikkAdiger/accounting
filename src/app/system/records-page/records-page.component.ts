import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from '../shared/models/category.model';
import { BaseApi } from '../../shared/core/base-api';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'wfm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {

    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        categories.forEach(() => {
          this.categories = categories;
          this.isLoaded = true;
        });
      });
  }

  newCategoryAdded(category: Category) {

    this.categories.push(category);

  }

  categoryEdited(category: Category) {

    const idx = this.categories.findIndex((c) => c.id === category.id);

    this.categories[idx] = category;

  }

}
