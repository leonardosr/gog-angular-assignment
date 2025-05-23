import { AmountPipe } from './amount.pipe';

describe('AmountPipe', () => {
  let pipe: AmountPipe;

  beforeEach(() => {
    pipe = new AmountPipe();
  });

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cases: { value: any, singular?: string, plural?: string, expected: string }[] = [
    { value: 0, expected: '0 items' },
    { value: 1, expected: '1 item' },
    { value: 2, expected: '2 items' },
    { value: 1, singular: 'game', plural: 'games', expected: '1 game' },
    { value: 3, singular: 'game', plural: 'games', expected: '3 games' },
    { value: -5, expected: '0 items' },
    { value: undefined, expected: '0 items' },
    { value: null, expected: '0 items' },
    { value: NaN, expected: '0 items' }
  ];

  cases.forEach(({ value, singular, plural, expected }) => {
    it(`should return "${expected}" for value: ${value} ${singular ? `(singular: ${singular})` : ''} ${plural ? `(plural: ${plural})` : ''}`, () => {
      expect(pipe.transform(value, singular, plural)).toBe(expected);
    });
  });
});