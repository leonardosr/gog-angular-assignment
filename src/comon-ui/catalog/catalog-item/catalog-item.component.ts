import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-catalog-item',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog-item.component.html',
  styleUrl: './catalog-item.component.scss'
})
export class CatalogItemComponent {

}
