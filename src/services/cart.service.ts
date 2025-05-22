import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICartItem } from 'src/interfaces/cart-item.interface';
import { ReadonlyService } from './crud.service';
import { API_URLS } from 'src/constants/api-endpoints.const';

const API_ENDPOINT = API_URLS.cart;

@Injectable()
export class CartService extends ReadonlyService<ICartItem> {

  constructor(httpClient: HttpClient) {
    super(httpClient, API_ENDPOINT);
  }
}
