import { Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGame } from 'src/interfaces/game.interface';
import { CatalogItemComponent } from "./catalog-item/catalog-item.component";
import { ICatalogItem } from 'src/interfaces/catalog-item.interface';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CatalogItemComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  @Output() addToCart = new EventEmitter<string>();
  public readonly isLoading = input<boolean>(false);
  public readonly items = input<(ICatalogItem | null)[]>([]);
}
