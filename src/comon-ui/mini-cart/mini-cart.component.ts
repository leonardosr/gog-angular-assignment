import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, Host, HostListener, input, Output, output, signal } from '@angular/core';
import { ICartItem } from 'src/interfaces/cart-item.interface';
import { AmountPipe } from 'src/pipes/cart-items-title.pipe';
import { FinalGamePricePipe } from "../../pipes/final-game-price.pipe";

@Component({
  selector: 'app-mini-cart',
  standalone: true,
  imports: [CommonModule, AmountPipe, FinalGamePricePipe],
  templateUrl: './mini-cart.component.html',
  styleUrl: './mini-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class MiniCartComponent {
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
  public readonly isLoading = input<boolean>(false);
  public readonly cartItems = input<ICartItem[]>([]);
  public readonly isOpen = signal<boolean>(false);
  public readonly cartTotal = computed<number>(() => {
    const cartItems = this.cartItems();
    return cartItems.reduce((acc, { game }) => {
      const gamePrice = new FinalGamePricePipe().transform(game) ?? 0;
      return acc + gamePrice;
    }, 0);
  });

  public toggleCart(event: MouseEvent) {
    event.preventDefault();
    this.isOpen.set(!this.isOpen())
  }

  public handleClearCartClick() {
    this.clearCart.emit();
  }
}
