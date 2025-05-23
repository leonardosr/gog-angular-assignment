import { Pipe, PipeTransform } from '@angular/core';
import { IGame } from '../interfaces/game.interface';
import { calculateFinalGamePrice } from 'src/utils/price-utils';

@Pipe({
  name: 'finalGamePricePipe',
  standalone: true
})
export class FinalGamePricePipe implements PipeTransform {
  transform(game: IGame): number | null {
    return calculateFinalGamePrice(game);
  }

}
