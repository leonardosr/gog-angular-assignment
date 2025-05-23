import { AppStore, initialState } from './app.component.store';
import { GameService } from 'src/services/game.service';
import { LibraryService } from 'src/services/library.service';
import { CartService } from 'src/services/cart.service';
import { ContentService } from 'src/services/content.service';
import { IGame } from 'src/interfaces/game.interface';
import { ICart, ICartItem } from 'src/interfaces/cart-item.interface';
import { ILibraryItem } from 'src/interfaces/library-item.interface';
import { IContent } from 'src/interfaces/featured-content.interface';
import { of, throwError } from 'rxjs';

describe('AppStore', () => {
    let store: AppStore;
    let gameService: jasmine.SpyObj<GameService>;
    let libraryService: jasmine.SpyObj<LibraryService>;
    let cartService: jasmine.SpyObj<CartService>;
    let contentService: jasmine.SpyObj<ContentService>;

    beforeEach(() => {
        gameService = jasmine.createSpyObj('GameService', ['getAll']);
        libraryService = jasmine.createSpyObj('LibraryService', ['getAll']);
        cartService = jasmine.createSpyObj('CartService', ['getById', 'clearCart', 'addToCart', 'removeFromCart']);
        contentService = jasmine.createSpyObj('ContentService', ['getById']);

        store = new AppStore(gameService, libraryService, cartService, contentService);
    });

    it('should create the store with initial state', () => {
        expect(store).toBeTruthy();
        expect(store.state()).toEqual(initialState);
    });

    describe('games', () => {
        it('should set games on setGames', () => {
            const games: IGame[] = [{ id: '1', title: 'Test', thumbnail: '', price: 10, discount: null }];
            store['setGames'](games);
            expect(store.state().gameList.games).toEqual(games);
            expect(store.state().gameList.isLoading).toBeFalse();
        });

        it('should load games via loadGames effect', (done) => {
            const games: IGame[] = [{ id: '1', title: 'Test', thumbnail: '', price: 10, discount: null }];
            gameService.getAll.and.returnValue(of(games));
            store.loadGames(of(void 0));
            store.select(s => s.gameList.games).subscribe(val => {
                if (val.length) {
                    expect(val).toEqual(games);
                    done();
                }
            });
        });

        it('should handle error in loadGames effect', (done) => {
            spyOn(console, 'error');
            gameService.getAll.and.returnValue(throwError(() => new Error('Games error')));
            store.loadGames(of(void 0));
            setTimeout(() => {
                expect(console.error).toHaveBeenCalledWith('[AppStore] loadGames effect failed:', jasmine.any(Error));
                done();
            }, 0);
        });
    });

    describe('library', () => {
        it('should set library on setLibrary', () => {
            const items: ILibraryItem[] = [{ id: '1', game: { id: 'g1', title: 'Game', thumbnail: '', price: 10, discount: null } }];
            store['setLibrary'](items);
            expect(store.state().libraryItems.items).toEqual(items);
            expect(store.state().libraryItems.isLoading).toBeFalse();
        });

        it('should load user library via loadLibrary effect', (done) => {
            const items: ILibraryItem[] = [{ id: '1', game: { id: 'g1', title: 'Game', thumbnail: '', price: 10, discount: null } }];
            libraryService.getAll.and.returnValue(of(items));
            store.loadLibrary(of(void 0));
            store.select(s => s.libraryItems.items).subscribe(val => {
                if (val.length) {
                    expect(val).toEqual(items);
                    done();
                }
            });
        });

        it('should handle error in loadLibrary effect', (done) => {
            spyOn(console, 'error');
            libraryService.getAll.and.returnValue(throwError(() => new Error('Library error')));
            store.loadLibrary(of(void 0));
            setTimeout(() => {
                expect(console.error).toHaveBeenCalledWith('[AppStore] loadLibrary effect failed:', jasmine.any(Error));
                done();
            }, 0);
        });
    });

    describe('content', () => {
        it('should set featured content on setFeaturedContent', () => {
            const content: IContent = { featuredImage: 'test.webp' };
            store['setFeaturedContent'](content);
            expect(store.state().featuredContent.content).toEqual(content);
            expect(store.state().featuredContent.isLoading).toBeFalse();
        });

        it('should load featured content via loadFeaturedContent effect', (done) => {
            const content: IContent = { featuredImage: 'test.webp' };
            contentService.getById.and.returnValue(of(content));
            store.loadFeaturedContent(of(void 0));
            store.select(s => s.featuredContent.content).subscribe(val => {
                if (val) {
                    expect(val).toEqual(content);
                    done();
                }
            });
        });

        it('should handle error in loadFeaturedContent effect', (done) => {
            spyOn(console, 'error');
            contentService.getById.and.returnValue(throwError(() => new Error('Content error')));
            store.loadFeaturedContent(of(void 0));
            setTimeout(() => {
                expect(console.error).toHaveBeenCalledWith('[AppStore] loadFeaturedContent effect failed:', jasmine.any(Error));
                done();
            }, 0);
        });
    });

    describe('cart', () => {
        it('should load cart via loadCart effect', (done) => {
            const cart: ICart = { id: '1', items: [] };
            cartService.getById.and.returnValue(of(cart));
            store.loadCart(of(void 0));
            store.select(s => s.cart.cartData).subscribe(val => {
                if (val) {
                    expect(val).toEqual(cart);
                    done();
                }
            });
        });

        it('should set cart on setCart', () => {
            const cart: ICart = { id: '1', items: [] };
            store['setCart'](cart);
            expect(store.state().cart.cartData).toEqual(cart);
            expect(store.state().cart.isLoading).toBeFalse();
        });

        it('should clear cart via clearCart effect', (done) => {
            cartService.clearCart.and.returnValue(of(void 0));
            cartService.getById.and.returnValue(of({ id: '1', items: [] }));
            store.clearCart(of(void 0));
            setTimeout(() => {
                expect(cartService.clearCart).toHaveBeenCalledWith(1);
                expect(cartService.getById).toHaveBeenCalled();
                done();
            }, 0);
        });

        it('should handle error in clearCart effect', (done) => {
            spyOn(console, 'error');
            cartService.clearCart.and.returnValue(throwError(() => new Error('Clear cart error')));
            store.clearCart(of(void 0));
            setTimeout(() => {
                expect(console.error).toHaveBeenCalledWith('[AppStore] clearCart effect failed:', jasmine.any(Error));
                done();
            }, 0);
        });

        it('should add to cart via addTocart effect', (done) => {
            cartService.addToCart.and.returnValue(of({
                id: '1',
            } as unknown as ICartItem));
            cartService.getById.and.returnValue(of({ id: '1', items: [] }));
            spyOn(store, 'state').and.returnValue({
                ...initialState,
                cart: { ...initialState.cart, cartData: { id: '1', items: [] } }
            });
            store.addTocart(of({ gameId: '1' }));
            setTimeout(() => {
                expect(cartService.addToCart).toHaveBeenCalledWith('1', '1');
                done();
            }, 0);
        });

        it('should handle error in addTocart effect', (done) => {
            spyOn(console, 'error');
            cartService.addToCart.and.returnValue(throwError(() => new Error('Add to cart error')));
            store.addTocart(of({ gameId: 'g1' }));
            setTimeout(() => {
                expect(console.error).toHaveBeenCalledWith('[AppStore] addTocart effect failed:', jasmine.any(Error));
                done();
            }, 0);
        });

        it('should remove from cart via removeFromCart effect', (done) => {
            cartService.removeFromCart.and.returnValue(of(void 0));
            cartService.getById.and.returnValue(of({ id: '1', items: [] }));
            store.removeFromCart(of({ itemId: '1' }));
            setTimeout(() => {
                expect(cartService.removeFromCart).toHaveBeenCalledWith('1', '1');
                expect(cartService.getById).toHaveBeenCalled();
                done();
            }, 0);
        });

        it('should handle error in removeFromCart effect', (done) => {
            spyOn(console, 'error');
            cartService.removeFromCart.and.returnValue(throwError(() => new Error('Remove from cart error')));
            store.removeFromCart(of({ itemId: '1' }));
            setTimeout(() => {
                expect(console.error).toHaveBeenCalledWith('[AppStore] removeFromCart effect failed:', jasmine.any(Error));
                done();
            }, 0);
        });

        it('should load cart and remove pending item via loadCartAndRemovePending effect', (done) => {
            const cart: ICart = { id: '1', items: [] };
            cartService.getById.and.returnValue(of(cart));
            // Set up initial state with a pending item
            store.patchState({
                pendingCartItems: new Set(['1'])
            });
            store.loadCartAndRemovePending(of({ gameId: '1' }));
            setTimeout(() => {
                expect(store.state().cart.cartData).toEqual(cart);
                expect(store.state().pendingCartItems.has('1')).toBeFalse();
                done();
            }, 0);
        });

        it('should handle error in loadCartAndRemovePending effect', (done) => {
            spyOn(console, 'error');
            cartService.getById.and.returnValue(throwError(() => new Error('Cart error')));
            store.loadCartAndRemovePending(of({ gameId: '1' }));
            setTimeout(() => {
                expect(console.error).toHaveBeenCalledWith('[AppStore] loadCartAndRemovePending effect failed:', jasmine.any(Error));
                done();
            }, 0);
        });
    });
});