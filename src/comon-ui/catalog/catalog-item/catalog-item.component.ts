import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, input, Output } from '@angular/core';
import { ICatalogItem } from 'src/interfaces/catalog-item.interface';
import { DiscountPipe } from '../../../pipes/discount.pipe';

@Component({
  selector: 'app-catalog-item',
  standalone: true,
  imports: [CommonModule, DiscountPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog-item.component.html',
  styleUrl: './catalog-item.component.scss'
})
export class CatalogItemComponent {
  @Output() addToCart = new EventEmitter<string>();
  public readonly isLoading = input<boolean>(false);
  public readonly item = input<ICatalogItem | null>();
  public readonly itemThumbailBackground = computed(() => {
    const thumbnail = this.item()?.game.thumbnail;
    return thumbnail ? `url(${thumbnail})` : 'none';
  });

  public handleAddToCart(gameId: string) {
    if (!gameId) return;
    this.addToCart.emit(gameId);
  }
}
