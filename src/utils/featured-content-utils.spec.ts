import { ICart } from 'src/interfaces/cart-item.interface';
import { ILibraryItem } from 'src/interfaces/library-item.interface';
import { IContent } from 'src/interfaces/featured-content.interface';
import { isFeaturedContentDisabled } from './featured-content-utils';

describe('isFeaturedContentDisabled', () => {
    const game1 = { id: '1', title: 'Game 1', thumbnail: '', price: 10, discount: null };
    const game2 = { id: '2', title: 'Game 2', thumbnail: '', price: 20, discount: 10 };

    const contentWithGame1: IContent = {
        featuredGame: game1
    } as IContent;

    const cart: ICart = {
        id: '1',
        items: [{ id: '1', game: game1 }]
    };

    const libraryItems: ILibraryItem[] = [
        { id: '1', game: game2 }
    ];

    const cases = [
        {
            desc: 'should return true if content is null',
            content: null,
            cart,
            libraryItems,
            pending: new Set([]),
            expected: true
        },
        {
            desc: 'should return true if content has no featuredGame',
            content: {} as IContent,
            cart,
            libraryItems,
            pending: new Set([]),
            expected: true
        },
        {
            desc: 'should return true if game is in library',
            content: { featuredGame: game2 },
            cart,
            libraryItems,
            pending: new Set([]),
            expected: true
        },
        {
            desc: 'should return true if game is in cart',
            content: contentWithGame1,
            cart,
            libraryItems: [],
            pending: new Set([]),
            expected: true
        },
        {
            desc: 'should return true if game is pending',
            content: { featuredGame: game2 },
            cart: null,
            libraryItems: [],
            pending: new Set(['2']),
            expected: true
        },
        {
            desc: 'should return false if game is not in cart, library or pending',
            content: { featuredGame: game2 },
            cart: null,
            libraryItems: [],
            pending: new Set([]),
            expected: false
        },
        {
            desc: 'should return false if cart and library are empty and game not pending',
            content: { featuredGame: game2 },
            cart: { id: '2', items: [] },
            libraryItems: [],
            pending: new Set([]),
            expected: false
        }
    ];

    cases.forEach(({ desc, content, cart, libraryItems, pending, expected }) => {
        it(desc, () => {
            expect(isFeaturedContentDisabled(content as IContent, libraryItems, cart, pending)).toBe(expected);
        });
    });
});