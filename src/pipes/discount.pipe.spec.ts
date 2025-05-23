import { DiscountPipe } from './discount.pipe';

describe('DiscountPipe', () => {
  let pipe: DiscountPipe;

  beforeEach(() => {
    pipe = new DiscountPipe();
  });

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cases: { input: any, expected: string }[] = [
    { input: 50, expected: '-50%' },
    { input: null, expected: '' },
    { input: undefined, expected: '' },
    { input: NaN, expected: '' },
    { input: 'abc', expected: '' },
  ];

  cases.forEach(({ input, expected }) => {
    it(`should return "${expected}" for input: ${input}`, () => {
      expect(pipe.transform(input)).toBe(expected);
    });
  });
});