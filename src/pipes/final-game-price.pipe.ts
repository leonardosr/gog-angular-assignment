import { Pipe, PipeTransform } from '@angular/core';
import { IGame } from '../interfaces/game.interface';

@Pipe({
  name: 'finalGamePricePipe',
  standalone: true
})
export class FinalGamePricePipe implements PipeTransform {

  transform(game: IGame | null | undefined): number | null {
    if (!game || typeof game.price !== 'number') return null;
    if (game.discount && typeof game.discount === 'number') {
      return +(game.price * (1 - game.discount / 100)).toFixed(2);
    }
    return game.price;
  }

}
