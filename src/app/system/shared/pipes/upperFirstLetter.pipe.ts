import { Pipe, PipeTransform } from '@angular/core';

@Pipe({

  name: 'upperFirstLetter'

})

export class UpperFirstLetterPipe implements PipeTransform {

  transform(value: string): string {


    return value.substr(0, 1).toUpperCase() + value.substr(1);
  }

}
