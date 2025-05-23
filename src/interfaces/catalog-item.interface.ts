import { IGame } from './game.interface';

export interface ICatalogItem {
    game: IGame;
    isInLibrary: boolean;
    isInCart: boolean;
    isPending: boolean;
}