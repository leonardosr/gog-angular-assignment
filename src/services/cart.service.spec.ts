import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { API_URLS } from 'src/constants/api-endpoints.const';
import { ICart } from 'src/interfaces/cart-item.interface';
import { IGame } from 'src/interfaces/game.interface';
import { provideHttpClient } from '@angular/common/http';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  const cartId = '1';
  const gameId = 'g1';
  const cartMock: ICart = {
    id: cartId,
    items: [
      { id: '0', game: { id: 'g2', title: 'Game 2', thumbnail: null, price: 10, discount: null } }
    ]
  };
  const gameMock: IGame = { id: gameId, title: 'Game 1', thumbnail: null, price: 20, discount: 10 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a game to the cart', () => {
    service.addToCart(cartId, gameId).subscribe();

    const cartReq = httpMock.expectOne(`${API_URLS.cart}/${cartId}`);
    expect(cartReq.request.method).toBe('GET');
    cartReq.flush(cartMock);

    const gameReq = httpMock.expectOne(`${API_URLS.games}/${gameId}`);
    expect(gameReq.request.method).toBe('GET');
    gameReq.flush(gameMock);

    const patchReq = httpMock.expectOne(`${API_URLS.cart}/${cartId}`);
    expect(patchReq.request.method).toBe('PATCH');
    expect(patchReq.request.body.items.length).toBe(2);
    patchReq.flush({});
  });

  it('should remove an item from the cart', () => {
    service.removeFromCart(cartId, '0').subscribe();

    const cartReq = httpMock.expectOne(`${API_URLS.cart}/${cartId}`);
    expect(cartReq.request.method).toBe('GET');
    cartReq.flush(cartMock);

    const patchReq = httpMock.expectOne(`${API_URLS.cart}/${cartId}`);
    expect(patchReq.request.method).toBe('PATCH');
    expect(patchReq.request.body.items.length).toBe(0);
    patchReq.flush({});
  });

  it('should clear the cart', () => {
    service.clearCart(1).subscribe();

    const patchReq = httpMock.expectOne(`${API_URLS.cart}/1`);
    expect(patchReq.request.method).toBe('PATCH');
    expect(patchReq.request.body.items).toEqual([]);
    patchReq.flush({});
  });
});