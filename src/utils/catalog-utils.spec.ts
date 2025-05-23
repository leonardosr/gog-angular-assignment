import { buildCatalogItems } from './catalog-utils';
import { IGame } from 'src/interfaces/game.interface';
import { ILibraryItem } from 'src/interfaces/library-item.interface';

describe('buildCatalogItems', () => {
    const game1: IGame = { id: 'g1', title: 'Game 1', thumbnail: '', price: 10, discount: null };
    const game2: IGame = { id: 'g2', title: 'Game 2', thumbnail: '', price: 20, discount: 10 };

    const cart = {
        id: '1',
        items: [
            { id: '1', game: game1 }
        ]
    };

    const libraryItems: ILibraryItem[] = [
        { id: '1', game: game2 }
    ];

    const cases = [
        {
            desc: 'should mark isInCart and isInLibrary correctly',
            games: [game1, game2],
            cart,
            libraryItems,
            expected: [
                { game: game1, isInLibrary: false, isInCart: true },
                { game: game2, isInLibrary: true, isInCart: false }
            ]
        },
        {
            desc: 'should return empty array if games is empty',
            games: [],
            cart,
            libraryItems,
            expected: []
        },
        {
            desc: 'should handle null cart',
            games: [game1],
            cart: null,
            libraryItems: [],
            expected: [
                { game: game1, isInLibrary: false, isInCart: false }
            ]
        },
        {
            desc: 'should handle empty libraryItems',
            games: [game1],
            cart,
            libraryItems: [],
            expected: [
                { game: game1, isInLibrary: false, isInCart: true }
            ]
        },
        {
            desc: 'should handle both cart and libraryItems empty',
            games: [game1],
            cart: { id: '1', items: [] },
            libraryItems: [],
            expected: [
                { game: game1, isInLibrary: false, isInCart: false }
            ]
        }
    ];

    cases.forEach(({ desc, games, cart, libraryItems, expected }) => {
        it(desc, () => {
            expect(buildCatalogItems(games, cart, libraryItems)).toEqual(expected);
        });
    });
});