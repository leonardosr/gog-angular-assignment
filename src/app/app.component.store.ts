import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { concatMap, delay, Observable, tap } from "rxjs";
import { ICartItem } from "src/interfaces/cart-item.interface";
import { ICatalogItem } from "src/interfaces/catalog-item.interface";
import { IFeaturedContent } from "src/interfaces/featured-content.interface";
import { IGame } from "src/interfaces/game.interface";
import { ILibraryItem } from "src/interfaces/library-item.interface";
import { CART_LIST, GAME_LIST, LIBRARY_LIST, PLACEHOLDER_CATALOG_LIST } from "./app.const";
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
    cartItems: {
        isLoading: boolean,
        items: ICartItem[]
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
    cartItems: {
        isLoading: true,
        items: []
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

    readonly catalogItems$: Observable<(ICatalogItem | null)[]> = this.select(({ gameList, cartItems, libraryItems }) => {
        if (gameList.isLoading) return PLACEHOLDER_CATALOG_LIST;
        return gameList.games.map((game: IGame) => ({
            game,
            isInLibrary: cartItems.items.some((cartItem: ICartItem) => cartItem.game.id === game.id),
            isInCart: libraryItems.items.some((libraryItem: ILibraryItem) => libraryItem.game.id === game.id),
        }))
    });

    readonly cartItems$: Observable<ICartItem[]> = this.select(state => state.cartItems.items);

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

    protected readonly setCart = this.updater((state, items: ICartItem[]) => {
        return {
            ...state,
            cartItems: {
                items,
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
            concatMap(() => this.cartService.getAll()),
            tap((items: ICartItem[]) => {
                this.setCart(items);
            })
        );
    });

}