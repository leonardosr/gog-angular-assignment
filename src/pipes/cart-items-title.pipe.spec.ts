import { AmountPipe } from './cart-items-title.pipe';

describe('CartItemsTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new AmountPipe();
    expect(pipe).toBeTruthy();
  });
});
