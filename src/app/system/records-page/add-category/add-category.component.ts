import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Message } from '../../../shared/models/message.model';


@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  @Output() categoryAdd = new EventEmitter<Category>();

  message: Message;

  sub: Subscription;

  constructor(private categoryService: CategoriesService) {
  }

  ngOnInit() {

    this.message = new Message('success', '');

  }

  onSubmit(form: NgForm) {

    let {capacity} = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(form.value.name, capacity);

    this.sub = this.categoryService.addCategory(category)
      .subscribe((element: Category) => {
        form.reset({name: '', capacity: 1});
        this.categoryAdd.emit(element);
        this.message.text = 'This category is added!';
        window.setTimeout(() => {
          this.message.text = '';
        }, 5000);

      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
