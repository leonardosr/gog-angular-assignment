import { calculateCartTotal, calculateFinalGamePrice } from './price-utils';
import { ICartItem } from 'src/interfaces/cart-item.interface';
import { IGame } from 'src/interfaces/game.interface';

describe('calculateFinalGamePrice', () => {
    const cases: { game: Partial<IGame> | null | undefined, expected: number | null }[] = [
        { game: null, expected: null },
        { game: undefined, expected: null },
        { game: { price: undefined }, expected: null },
        { game: { price: null } as unknown as IGame, expected: null },
        { game: { price: 100 }, expected: 100 },
        { game: { price: 100, discount: 25 }, expected: 75 },
        { game: { price: 99.99, discount: 15 }, expected: 84.99 },
        { game: { price: 50, discount: 0 }, expected: 50 }
    ];

    cases.forEach(({ game, expected }, idx) => {
        it(`should return ${expected} for case #${idx + 1}`, () => {
            if (typeof expected === 'number' && game && typeof game.discount === 'number' && game.discount > 0) {
                expect(calculateFinalGamePrice(game as IGame)).toBeCloseTo(expected, 2);
            } else {
                expect(calculateFinalGamePrice(game as IGame)).toBe(expected);
            }
        });
    });
});


describe('calculateCartTotal', () => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cases: { cart: any[], expected: number }[] = [
        { cart: [], expected: 0 },
        {
            cart: [
                { id: '1', game: { id: 'g1', title: '', thumbnail: '', price: 10, discount: null } },
                { id: '2', game: { id: 'g2', title: '', thumbnail: '', price: 20, discount: null } }
            ],
            expected: 30
        },
        {
            cart: [
                { id: '1', game: { id: 'g1', title: '', thumbnail: '', price: 100, discount: 50 } }, // 50
                { id: '2', game: { id: 'g2', title: '', thumbnail: '', price: 20, discount: 25 } }   // 15
            ],
            expected: 65
        },
        {
            cart: [
                { id: '1', game: { id: 'g1', title: '', thumbnail: '', price: undefined, discount: null } },
                { id: '2', game: { id: 'g2', title: '', thumbnail: '', price: 20, discount: null } }
            ],
            expected: 20
        },
        {
            cart: [
                //eslint-disable-next-line @typescript-eslint/no-explicit-any
                { id: '1', game: null as any },
                { id: '2', game: { id: 'g2', title: '', thumbnail: '', price: 20, discount: null } }
            ],
            expected: 20
        }
    ];

    cases.forEach(({ cart, expected }, idx) => {
        it(`should return ${expected} for cart case #${idx + 1}`, () => {
            expect(calculateCartTotal(cart as ICartItem[])).toBe(expected);
        });
    });
}); 