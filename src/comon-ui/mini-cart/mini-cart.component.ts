import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, HostListener, input, Output, signal } from '@angular/core';
import { ICartItem } from 'src/interfaces/cart-item.interface';
import { AmountPipe } from 'src/pipes/amount.pipe';
import { FinalGamePricePipe } from '../../pipes/final-game-price.pipe';
import { calculateCartTotal } from 'src/utils/price-utils';

@Component({
  selector: 'app-mini-cart',
  standalone: true,
  imports: [CommonModule, AmountPipe, FinalGamePricePipe, NgOptimizedImage],
  templateUrl: './mini-cart.component.html',
  styleUrl: './mini-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class MiniCartComponent {
  // Close the cart on ESC key
  @HostListener('document:keydown.escape', ['$event'])
  onEscKey(event: KeyboardEvent) {
    if (this.isOpen()) {
      this.isOpen.set(false);
      event.stopPropagation();
    }
  }
  // Only close the cart if the click is outside both the cart panel and the cart button.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const cartPanel = document.querySelector('.cart-panel');
    const cartButton = document.querySelector('.cart');
    if (
      this.isOpen() &&
      cartPanel &&
      cartButton &&
      !cartPanel.contains(event.target as Node) &&
      !cartButton.contains(event.target as Node)
    ) {
      this.isOpen.set(false);
    }
  }
  @Output() clearCart = new EventEmitter<void>();
  @Output() removeItem = new EventEmitter<string>();
  public readonly isLoading = input<boolean>(false);
  public readonly cartItems = input<ICartItem[]>([]);
  public readonly isOpen = signal<boolean>(false);
  public readonly cartTotal = computed<number>(() => {
    const cartItems = this.cartItems();
    return calculateCartTotal(cartItems);
  });

  public toggleCart(event: MouseEvent | Event) {
    event.preventDefault();
    this.isOpen.set(!this.isOpen());
  }

  public handleClearCartClick() {
    this.clearCart.emit();
  }

  public handleRemoveItem(event: MouseEvent, cartItemId: string) {
    event.preventDefault();
    this.removeItem.emit(cartItemId);
  }
}
