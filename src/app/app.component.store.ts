import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { concatMap, delay, Observable, tap } from "rxjs";
import { ICart, ICartItem } from "src/interfaces/cart-item.interface";
import { ICatalogItem } from "src/interfaces/catalog-item.interface";
import { IFeaturedContent } from "src/interfaces/featured-content.interface";
import { IGame } from "src/interfaces/game.interface";
import { ILibraryItem } from "src/interfaces/library-item.interface";
import { PLACEHOLDER_CATALOG_LIST } from "./app.const";
import { GameService } from "src/services/game.service";
import { LibraryService } from "src/services/library.service";
import { CartService } from "src/services/cart.service";

export interface AppState {
    featuredContent: {
        isLoading: boolean,
        content: IFeaturedContent | null
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
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {
    constructor(protected readonly gameService: GameService, protected readonly libraryService: LibraryService, protected readonly cartService: CartService) {
        super(initialState);
        setTimeout(() => {
            this.patchState({
                featuredContent: {
                    isLoading: false,
                    content: {
                        backgroundImageUrl: 'assets/_remote-assets/f85ecadb56c7f5270f50bd2a8e40ca0e4febb7cd.png'
                    }
                },
            });
        });
    }

    readonly catalogItems$: Observable<(ICatalogItem | null)[]> = this.select(({ gameList, cart, libraryItems }) => {
        if (gameList.isLoading) return PLACEHOLDER_CATALOG_LIST;
        return gameList.games.map((game: IGame) => ({
            game,
            isInLibrary: libraryItems.items.some((cartItem: ICartItem) => cartItem.game.id === game.id),
            isInCart: cart.cartData?.items.some((libraryItem: ILibraryItem) => libraryItem.game.id === game.id),
        }))
    });

    readonly cartItems$: Observable<ICartItem[]> = this.select(state => state.cart?.cartData?.items ?? []);

    readonly featuredContent$: Observable<IFeaturedContent | null> = this.select(state => state.featuredContent.content);
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

    public readonly loadGames = this.effect((params$) => {
        return params$.pipe(
            concatMap(() => this.gameService.getAll()),
            tap((games: IGame[]) => {
                this.setGames(games);
            })
        );
    });

    public readonly loadUserLibrary = this.effect((params$) => {
        return params$.pipe(
            concatMap(() => this.libraryService.getAll()),
            tap((items: ILibraryItem[]) => {
                this.setLibrary(items);
            })
        );
    });

    public readonly loadCart = this.effect((params$) => {
        return params$.pipe(
            concatMap(() => this.cartService.getById("1")),
            tap((cartData: ICart) => {
                this.setCart(cartData);
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
            })
        )
    });

    public addTocart = this.effect<{ gameId: string }>((params$) => {
        return params$.pipe(
            concatMap(({ gameId }) => this.cartService.addToCart("1", gameId)),
            tap(() => {
                this.loadCart();
            })
        )
    });

    public removeFromCart = this.effect<{ itemId: string }>((params$) => {
        return params$.pipe(
            concatMap(({ itemId }) => this.cartService.removeFromCart("1", itemId)),
            tap(() => {
                this.loadCart();
            })
        )
    });
}