import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datefire',
  standalone: true
})
export class DatefirePipe implements PipeTransform {

  transform(value: any): Date {
    return new Date(value.seconds * 1000);
  }

}
