import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniCartComponent } from './mini-cart.component';
import { ICartItem } from 'src/interfaces/cart-item.interface';

const TEST_GAME_1 = { id: '1', title: 'Game 1', thumbnail: null, price: 10, discount: null };
const TEST_GAME_2 = { id: '2', title: 'Game 2', thumbnail: null, price: 20, discount: 50 };
const TEST_CART_ITEM_1: ICartItem = { id: '1', game: TEST_GAME_1 };
const TEST_CART_ITEM_2: ICartItem = { id: '2', game: TEST_GAME_2 };
const TEST_CART_ITEMS: ICartItem[] = [TEST_CART_ITEM_1, TEST_CART_ITEM_2];

describe('MiniCartComponent', () => {
  let component: MiniCartComponent;
  let fixture: ComponentFixture<MiniCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniCartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MiniCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit clearCart event', () => {
    spyOn(component.clearCart, 'emit');
    component.clearCart.emit();
    expect(component.clearCart.emit).toHaveBeenCalled();
  });

  it('should emit removeItem event with correct id', () => {
    spyOn(component.removeItem, 'emit');
    const id = 'test-id';
    component.removeItem.emit(id);
    expect(component.removeItem.emit).toHaveBeenCalledWith(id);
  });

  it('should compute cart total correctly', () => {
    fixture.componentRef.setInput('cartItems', TEST_CART_ITEMS);
    expect(component.cartTotal()).toBe(20);
  });

  it('should close cart when clicking outside', () => {
    component.isOpen.set(true);
    const event = new MouseEvent('click');
    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '.cart-panel' || selector === '.cart') {
        return document.createElement('div');
      }
      return null;
    });
    component.onDocumentClick(event);
    expect(component.isOpen()).toBe(false);
  });

  it('should show "Back to shopping" button when cart is empty', () => {
    component.isOpen.set(true);
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector('.empty-cart .btn');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Back to shopping');
  });

  it('should close the cart when "Back to shopping" is clicked', () => {
    component.isOpen.set(true);
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector('.empty-cart .btn');
    btn.click();
    fixture.detectChanges();
    expect(component.isOpen()).toBeFalse();
  });

  it('should not open the cart when isLoading is true', () => {
    fixture.componentRef.setInput('isLoading', true);
    component.isOpen.set(false);
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    window.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.isOpen()).toBeFalse();
  });
});