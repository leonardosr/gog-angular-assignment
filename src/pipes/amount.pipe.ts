import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountPipe',
  standalone: true
})
export class AmountPipe implements PipeTransform {

  transform(
    value: number,
    singular: string = 'item',
    plural: string = 'items'
  ): string {
    if (typeof value !== 'number' || isNaN(value) || value < 0) return `0 ${plural}`;
    if (value === 1) return `1 ${singular}`;
    return `${value} ${plural}`;
  }

}
