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
            pending: new Set([]),
            expected: [
                { game: game1, isInLibrary: false, isInCart: true, isPending: false },
                { game: game2, isInLibrary: true, isInCart: false, isPending: false }
            ]
        },
        {
            desc: 'should return empty array if games is empty',
            games: [],
            cart,
            libraryItems,
            pending: new Set([]),
            expected: []
        },
        {
            desc: 'should handle null cart',
            games: [game1],
            cart: null,
            libraryItems: [],
            pending: new Set([]),
            expected: [
                { game: game1, isInLibrary: false, isInCart: false, isPending: false }
            ]
        },
        {
            desc: 'should handle empty libraryItems',
            games: [game1],
            cart,
            libraryItems: [],
            pending: new Set([]),
            expected: [
                { game: game1, isInLibrary: false, isInCart: true, isPending: false }
            ]
        },
        {
            desc: 'should handle both cart and libraryItems empty',
            games: [game1],
            cart: { id: '1', items: [] },
            libraryItems: [],
            pending: new Set([]),
            expected: [
                { game: game1, isInLibrary: false, isInCart: false, isPending: false }
            ]
        },
        {
            desc: 'should set isPending true if game id is in pendingCartItems',
            games: [game1, game2],
            cart,
            libraryItems,
            pending: new Set(['g2']),
            expected: [
                { game: game1, isInLibrary: false, isInCart: true, isPending: false },
                { game: game2, isInLibrary: true, isInCart: false, isPending: true }
            ]
        }
    ];

    cases.forEach(({ desc, games, cart, libraryItems, pending, expected }) => {
        it(desc, () => {
            expect(buildCatalogItems(games, cart, libraryItems, pending)).toEqual(expected);
        });
    });
});