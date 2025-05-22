import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem } from 'src/interfaces/cart-item.interface';

@Injectable()
export class CartService {

  constructor(public httpClient: HttpClient) { }

  public getAll(): Observable<ICartItem[]> {
    return this.httpClient.get<ICartItem[]>('http://localhost:3000/cart');
  }
}
