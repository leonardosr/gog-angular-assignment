import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ICartItem } from 'src/interfaces/cart-item.interface';

@Component({
  selector: 'app-mini-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-cart.component.html',
  styleUrl: './mini-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class MiniCartComponent {
  public readonly isLoading = input<boolean>(false);
  public readonly cartItems = input<ICartItem[]>([]);
  public readonly isOpen = signal<boolean>(false);


  public toggleCart(event: MouseEvent) {
    event.preventDefault();
    this.isOpen.set(!this.isOpen())
  }
}
