import { ICartItem } from "src/interfaces/cart-item.interface";
import { IGame } from "src/interfaces/game.interface";
import { ILibraryItem } from "src/interfaces/library-item.interface";

const PLACEHOLDER_ITEMS_COUNT = 5;
export const PLACEHOLDER_CATALOG_LIST = Array(PLACEHOLDER_ITEMS_COUNT).fill(null);

export const GAME_LIST: IGame[] = [
    {
        id: 1,
        title: 'Oddworld: Stranger’s Wrath',
        thumbnail: 'assets/_remote-assets/game1.png',
        discount: 50,
        price: 50.00
    },
    {
        id: 2,
        title: 'Chaos on Deponia',
        thumbnail: 'assets/_remote-assets/game2.png',
        discount: null,
        price: 50.00
    }, {
        id: 3,
        title: 'The settlers 2: Gold Edition',
        thumbnail: 'assets/_remote-assets/game3.png',
        discount: null,
        price: 50.00
    },
    {
        id: 4,
        title: 'Neverwinter Nights',
        thumbnail: 'assets/_remote-assets/game4.png',
        discount: null,
        price: 50.00
    },

    {
        id: 5,
        title: 'Assassin’s creed: Director’s Cut',
        thumbnail: 'assets/_remote-assets/game5.png',
        discount: 50,
        price: 50.00
    }
];

export const LIBRARY_LIST: ILibraryItem[] = [
    {
        id: 1,
        game: GAME_LIST[2]
    },
    {
        id: 2,
        game: GAME_LIST[4]
    }
];

export const CART_LIST: ICartItem[] = [
    {
        id: 1,
        game: GAME_LIST[3]
    }
];