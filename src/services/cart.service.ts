import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart, ICartItem } from 'src/interfaces/cart-item.interface';
import { ApiService } from './api.service';
import { API_URLS } from 'src/constants/api-endpoints.const';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { IGame } from 'src/interfaces/game.interface';

const API_ENDPOINT = API_URLS.cart;

export function generateNextCartItemId(items: ICartItem[]): string {
  if (!items.length) return "0";
  const maxId = Math.max(...items.map(item => parseInt(item.id, 10) || 0));
  return (maxId + 1).toString();
}


@Injectable()
export class CartService extends ApiService<ICart> {
  constructor(httpClient: HttpClient) {
    super(httpClient, API_ENDPOINT);
  }

  public addToCart(id: string, gameId: string): Observable<ICartItem> {
    //Get all the carts item and patch the record. Wokaround to solve json-server limitations
    return forkJoin({
      cart: this.getById(id),
      game: this.httpClient.get<IGame>(`${API_URLS.games}/${gameId}`)
    }).pipe(
      switchMap(({ cart, game }) => {
        const newCartItem = {
          id: generateNextCartItemId(cart.items),
          game
        };
        console.log(newCartItem);
        return this.httpClient.patch<void>(`${this.apiEndpoint}/${id}`, {
          items: [...cart.items.filter((item: ICartItem) => item.game.id !== gameId), newCartItem]
        }).pipe(
          //simulates a response form the server
          switchMap(() => of(newCartItem))
        );
      })
    );
  }

  public removeFromCart(id: string, cartItemId: string): Observable<void> {
    //Get all the carts item and patch the record. Wokaround to solve json-server limitations
    return forkJoin({
      cart: this.getById(id)
    }).pipe(
      switchMap(({ cart }) => {
        return this.httpClient.patch<void>(`${this.apiEndpoint}/${id}`, {
          items: cart.items.filter((item: ICartItem) => item.id !== cartItemId)
        });
      })
    );
  }


  public clearCart(id: number) {
    return this.httpClient.patch<void>(`${this.apiEndpoint}/${id}`, {
      items: []
    });
  }
}
