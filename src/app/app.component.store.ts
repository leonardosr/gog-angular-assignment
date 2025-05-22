import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { ICatalogItem } from "src/interfaces/catalog-item.interface";
import { IFeaturedContent } from "src/interfaces/featured-content.interface";
import { IGame } from "src/interfaces/game.interface";

export interface AppState {
    featuredContent: IFeaturedContent | null;
    catalogItems: ICatalogItem[] | null[];
    isLoading: boolean;
}

export const initialState: AppState = {
    featuredContent: null,
    catalogItems: [null, null, null, null, null],
    isLoading: true
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {

    constructor() {
        super(initialState);
        setTimeout(() => {
            this.patchState({
                isLoading: false,
                catalogItems: [{
                    game: {
                        id: 1,
                        title: 'Oddworld: Stranger’s Wrath',
                        thumbnail: 'assets/_remote-assets/game1.png',
                        discount: 50,
                        price: 50.00
                    },
                    isInCart: false,
                    isInLibrary: false
                },
                {
                    game: {
                        id: 2,
                        title: 'Chaos on Deponia',
                        thumbnail: 'assets/_remote-assets/game2.png',
                        discount: null,
                        price: 50.00
                    },
                    isInCart: true,
                    isInLibrary: false
                },
                {
                    game: {
                        id: 3,
                        title: 'The settlers 2: Gold Edition',
                        thumbnail: 'assets/_remote-assets/game3.png',
                        discount: null,
                        price: 50.00
                    },
                    isInCart: false,
                    isInLibrary: false
                },
                {
                    game: {
                        id: 4,
                        title: 'Neverwinter Nights',
                        thumbnail: 'assets/_remote-assets/game4.png',
                        discount: null,
                        price: 50.00
                    },
                    isInCart: false,
                    isInLibrary: true
                },
                {
                    game: {
                        id: 5,
                        title: 'Assassin’s creed: Director’s Cut',
                        thumbnail: 'assets/_remote-assets/game5.png',
                        discount: 50,
                        price: 50.00
                    },
                    isInCart: false,
                    isInLibrary: false
                }],
                featuredContent: {
                    backgroundImageUrl: 'assets/_remote-assets/f85ecadb56c7f5270f50bd2a8e40ca0e4febb7cd.png'
                }
            });
        }, 1000);
    }

    readonly catalogItems$: Observable<ICatalogItem[] | null[]> = this.select(state => state.catalogItems);
    readonly featuredContent$: Observable<IFeaturedContent | null> = this.select(state => state.featuredContent);
    readonly isLoading$: Observable<boolean> = this.select(state => state.isLoading);

}