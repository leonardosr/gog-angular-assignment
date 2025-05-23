import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (typeof value !== 'number' || isNaN(value)) return '';
    return `-${value}%`;
  }

}