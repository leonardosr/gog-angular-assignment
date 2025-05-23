import { ICartItem } from 'src/interfaces/cart-item.interface';
import { IGame } from 'src/interfaces/game.interface';

export function calculateCartTotal(cartItems: ICartItem[]): number {
  // Computes the total price of all items in the cart, using the final price pipe for discounts.
  return cartItems.reduce((acc, { game }) => {
    const gamePrice = calculateFinalGamePrice(game) ?? 0;
    return acc + gamePrice;
  }, 0);
}

export function calculateFinalGamePrice(game: IGame | null | undefined): number | null {
  if (!game || typeof game.price !== 'number') return null;
  if (game.discount && typeof game.discount === 'number') {
    return +(game.price * (1 - game.discount / 100)).toFixed(2);
  }
  return game.price;
}