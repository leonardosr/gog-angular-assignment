import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IGame } from 'src/interfaces/game.interface';

@Component({
  selector: 'app-catalog-item',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog-item.component.html',
  styleUrl: './catalog-item.component.scss'
})
export class CatalogItemComponent {
  public readonly isLoading = input<boolean>(false);
  public readonly item = input<IGame | null>();
}
