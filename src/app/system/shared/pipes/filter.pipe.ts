import { Pipe, PipeTransform } from '@angular/core';

import { Category } from '../models/category.model';

@Pipe({
  name: 'wfmFilter'
})

export class FilterPipe implements PipeTransform {

  transform(items: any, value: string, field: string, categories: Category[]): any {

    if (items.length === 0 || value === '') {
      return items;
    }

    return items.filter((i) => {
      const t = Object.assign({}, i);
      if (!isNaN(t[field])) {
        t[field] = t[field] + '';
      }
      if (field === 'category') {
        t[field] = categories.find(c => c.id === +t[field]).name;
      }
      return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

}
