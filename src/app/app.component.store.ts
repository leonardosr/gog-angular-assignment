import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, concatMap, EMPTY, Observable, tap } from 'rxjs';
import { ICart, ICartItem } from 'src/interfaces/cart-item.interface';
import { ICatalogItem } from 'src/interfaces/catalog-item.interface';
import { IContent } from 'src/interfaces/featured-content.interface';
import { IGame } from 'src/interfaces/game.interface';
import { ILibraryItem } from 'src/interfaces/library-item.interface';
import { PLACEHOLDER_CATALOG_LIST } from './app.const';
import { GameService } from 'src/services/game.service';
import { LibraryService } from 'src/services/library.service';
import { CartService } from 'src/services/cart.service';
import { ContentService } from 'src/services/content.service';
import { buildCatalogItems } from 'src/utils/catalog-utils';

export interface AppState {
    featuredContent: {
        isLoading: boolean,
        content: IContent | null
    };
    gameList: {
        isLoading: boolean,
        games: IGame[],
    };
    libraryItems: {
        isLoading: boolean,
        items: ILibraryItem[],
    };
    cart: {
        isLoading: boolean,
        cartData: ICart | null
    };
    pendingCartItems: Set<string>
}

export const initialState: AppState = {
    featuredContent: {
        isLoading: true,
        content: null
    },
    gameList: {
        isLoading: true,
        games: []
    },
    cart: {
        isLoading: true,
        cartData: null
    },
    libraryItems: {
        isLoading: true,
        items: []
    },
    pendingCartItems: new Set<string>([])
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {
    constructor(
        protected readonly gameService: GameService,
        protected readonly libraryService: LibraryService,
        protected readonly cartService: CartService,
        protected readonly contentService: ContentService) {
        super(initialState);
    }

    // Combines game, cart, and library state to produce catalog items with isInCart/isInLibrary flags.
    // Returns a placeholder list while loading for the first time.
    readonly catalogItems$: Observable<(ICatalogItem | null)[]> = this.select(({ gameList, cart, libraryItems, pendingCartItems }) => {
        if (gameList.isLoading) return PLACEHOLDER_CATALOG_LIST;
        return buildCatalogItems(gameList.games, cart.cartData, libraryItems.items, pendingCartItems);
    });

    readonly cartItems$: Observable<ICartItem[]> = this.select(state => state.cart?.cartData?.items ?? []);

    readonly featuredContent$: Observable<IContent | null> = this.select(state => state.featuredContent.content);
    readonly isGameListLoading$: Observable<boolean> = this.select(state => state.gameList.isLoading);
    readonly isFetauredContentLoading$: Observable<boolean> = this.select(state => state.featuredContent.isLoading);

    protected readonly setGames = this.updater((state, games: IGame[]) => {
        return {
            ...state,
            gameList: {
                games,
                isLoading: false
            }
        };
    });

    protected readonly setLibrary = this.updater((state, items: ILibraryItem[]) => {
        return {
            ...state,
            libraryItems: {
                items,
                isLoading: false
            }
        };
    });

    protected readonly setCart = this.updater((state, cartData: ICart) => {
        return {
            ...state,
            cart: {
                cartData,
                isLoading: false
            }
        };
    });

    protected readonly setFeaturedContent = this.updater((state, content: IContent) => {
        return {
            ...state,
            featuredContent: {
                content,
                isLoading: false,
            }
        };
    });

    protected readonly addPendingCartItem = this.updater((state, gameId: string) => {
        return {
            ...state,
            pendingCartItems: new Set(state.pendingCartItems).add(gameId)
        };
    });

    public readonly loadGames = this.effect((params$) => {
        return params$.pipe(
            concatMap(() => this.gameService.getAll()),
            tap((games: IGame[]) => {
                this.setGames(games);
            }),
            catchError(err => {
                //Using console.error to simplify the error handling. 
                //In a real app it sohuld be done using a toast component
                console.error('[AppStore] loadGames effect failed:', err);
                return EMPTY;
            })
        );
    });

    public readonly loadLibrary = this.effect((params$) => {
        return params$.pipe(
            concatMap(() => this.libraryService.getAll()),
            tap((items: ILibraryItem[]) => {
                this.setLibrary(items);
            }),
            catchError(err => {
                console.error('[AppStore] loadLibrary effect failed:', err);
                return EMPTY;
            })
        );
    });

    public readonly loadCart = this.effect((params$) => {
        return params$.pipe(
            concatMap(() => this.cartService.getById('1')),
            tap((cartData: ICart) => {
                this.setCart(cartData);
            }),
            catchError(err => {
                console.error('[AppStore] loadCart effect failed:', err);
                return EMPTY;
            })
        );
    });

    public readonly loadFeaturedContent = this.effect((params$) => {
        return params$.pipe(
            concatMap(() => this.contentService.getById('1')),
            tap((cartData: IContent) => {
                this.setFeaturedContent(cartData);
            }),
            catchError(err => {
                console.error('[AppStore] loadFeaturedContent effect failed:', err);
                return EMPTY;
            })
        );
    });

    public readonly clearCart = this.effect((params$) => {
        return params$.pipe(
            concatMap(
                () => this.cartService.clearCart(1)
            ),
            tap(() => {
                this.loadCart();
            }),
            catchError(err => {
                console.error('[AppStore] clearCart effect failed:', err);
                return EMPTY;
            })
        )
    });

    public addTocart = this.effect<{ gameId: string }>((params$) => {
        return params$.pipe(
            tap(({ gameId }) => this.addPendingCartItem(gameId)),
            concatMap(({ gameId }) => this.cartService.addToCart('1', gameId)),
            tap(() => {
                this.loadCart();
            }),
            catchError(err => {
                console.error('[AppStore] addTocart effect failed:', err);
                return EMPTY;
            })
        )
    });

    public removeFromCart = this.effect<{ itemId: string }>((params$) => {
        return params$.pipe(
            concatMap(({ itemId }) => this.cartService.removeFromCart('1', itemId)),
            tap(() => {
                this.loadCart();
            }),
            catchError(err => {
                console.error('[AppStore] removeFromCart effect failed:', err);
                return EMPTY;
            })
        )
    });
}