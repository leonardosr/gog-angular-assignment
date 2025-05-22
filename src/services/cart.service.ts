import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart, ICartItem } from 'src/interfaces/cart-item.interface';
import { ApiService } from './api.service';
import { API_URLS } from 'src/constants/api-endpoints.const';
import { concatMap, EMPTY, forkJoin, Observable, switchMap } from 'rxjs';
import { IGame } from 'src/interfaces/game.interface';

const API_ENDPOINT = API_URLS.cart;

@Injectable()
export class CartService extends ApiService<ICart> {
  constructor(httpClient: HttpClient) {
    super(httpClient, API_ENDPOINT);
  }

  public addToCart(id: string, gameId: string): Observable<void> {
    //Get all the carts item and patch the record. Wokaround to solve json-server limitations
    return forkJoin({
      cart: this.getById(id),
      game: this.httpClient.get<IGame>(`${API_URLS.games}/${gameId}`)
    }).pipe(
      switchMap(({ cart, game }) => {
        return this.httpClient.patch<void>(`${this.apiEndpoint}/${id}`, {
          items: [...cart.items, {
            id: cart.items.length.toString(),
            game
          }]
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
