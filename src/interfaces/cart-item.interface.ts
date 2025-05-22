import { IGame } from "./game.interface";


export interface ICart {
    id: string,
    items: ICartItem[]
}

export interface ICartItem {
    id: string;
    game: IGame;
}