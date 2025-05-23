import { FinalGamePricePipe } from './final-game-price.pipe';
import { IGame } from '../interfaces/game.interface';

describe('FinalGamePricePipe', () => {
  let pipe: FinalGamePricePipe;

  beforeEach(() => {
    pipe = new FinalGamePricePipe();
  });

  const cases: Array<{ game: Partial<IGame> | null | undefined, expected: number | null }> = [
    { game: null, expected: null },
    { game: undefined, expected: null },
    { game: { price: undefined }, expected: null },
    { game: { price: null } as unknown as IGame, expected: null },
    { game: { id: '1', title: 'Test', thumbnail: null, price: 100, discount: null }, expected: 100 },
    { game: { id: '1', title: 'Test', thumbnail: null, price: 100, discount: 25 }, expected: 75 },
    { game: { id: '1', title: 'Test', thumbnail: null, price: 99.99, discount: 15 }, expected: 84.9915 },
    { game: { id: '1', title: 'Test', thumbnail: null, price: 50, discount: 0 }, expected: 50 }
  ];

  cases.forEach(({ game, expected }, idx) => {
    it(`should return ${expected} for case #${idx + 1}`, () => {
      if (typeof expected === 'number' && game && typeof game.discount === 'number' && game.discount > 0) {
        expect(pipe.transform(game as IGame)).toBeCloseTo(expected, 2);
      } else {
        expect(pipe.transform(game as IGame)).toBe(expected);
      }
    });
  });
});