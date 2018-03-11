import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from '../../../shared/models/message.model';


@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  @Output() categoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  sub: Subscription;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {

    this.message = new Message('success', '');
    this.onCategoryChange();

  }

  onSubmit(form: NgForm) {

    let {capacity} = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(form.value.name, capacity, +this.currentCategoryId);

    this.sub = this.categoriesService.updateCategory(category)
      .subscribe((element: Category) => {
        this.categoryEdit.emit(element);
        this.message.text = 'Category is edited success';
        window.setTimeout(() => {
          this.message.text = '';
        }, 5000);
      });
  }

  onCategoryChange() {

    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
