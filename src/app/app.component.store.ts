import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { ICartItem } from "src/interfaces/cart-item.interface";
import { ICatalogItem } from "src/interfaces/catalog-item.interface";
import { IFeaturedContent } from "src/interfaces/featured-content.interface";
import { IGame } from "src/interfaces/game.interface";
import { ILibraryItem } from "src/interfaces/library-item.interface";
import { CART_LIST, GAME_LIST, LIBRARY_LIST, PLACEHOLDER_CATALOG_LIST } from "./app.const";

export interface AppState {
    featuredContent: IFeaturedContent | null;
    gameList: IGame[];
    libraryItems: ILibraryItem[];
    cartItems: ICartItem[];
    isLoading: boolean;
}

export const initialState: AppState = {
    featuredContent: null,
    gameList: [],
    cartItems: [],
    libraryItems: [],
    isLoading: true
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {

    constructor() {
        super(initialState);
        setTimeout(() => {
            this.patchState({
                isLoading: false,
                featuredContent: {
                    backgroundImageUrl: 'assets/_remote-assets/f85ecadb56c7f5270f50bd2a8e40ca0e4febb7cd.png'
                },
                gameList: GAME_LIST,
                cartItems: CART_LIST,
                libraryItems: LIBRARY_LIST
            });
        }, 1000);
    }

    readonly catalogItems$: Observable<(ICatalogItem | null)[]> = this.select(({ gameList, cartItems, libraryItems, isLoading }) => {
        if (isLoading) return PLACEHOLDER_CATALOG_LIST;
        return gameList.map((game: IGame) => ({
            game,
            isInLibrary: cartItems.some((cartItem: ICartItem) => cartItem.game.id === game.id),
            isInCart: libraryItems.some((libraryItem: ILibraryItem) => libraryItem.game.id === game.id),
        }))
    });
    readonly featuredContent$: Observable<IFeaturedContent | null> = this.select(state => state.featuredContent);
    readonly isLoading$: Observable<boolean> = this.select(state => state.isLoading);

}