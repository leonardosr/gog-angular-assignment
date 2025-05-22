import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { ICatalogItem } from 'src/interfaces/catalog-item.interface';
import { FinalGamePricePipe } from 'src/pipes/final-game-price.pipe';

@Component({
  selector: 'app-catalog-item',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog-item.component.html',
  styleUrl: './catalog-item.component.scss'
})
export class CatalogItemComponent {
  @Output() addToCart = new EventEmitter<string>();
  public readonly isLoading = input<boolean>(false);
  public readonly item = input<ICatalogItem | null>();

  public handleAddToCart(gameId: string) {
    if (!gameId) return;
    this.addToCart.emit(gameId);
  }
}
