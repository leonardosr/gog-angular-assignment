import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavbarComponent } from "../comon-ui/navbar/navbar.component";
import { FeaturedComponent } from "../comon-ui/featured/featured.component";
import { CatalogComponent } from 'src/comon-ui/catalog/catalog.component';
import { IFeaturedContent } from 'src/interfaces/featured-content.interface';
import { AppStore, initialState } from './app.component.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, FeaturedComponent, CatalogComponent],
  providers: [AppStore]
})
export class AppComponent {
  public readonly featuredContent = toSignal(this.appStore.featuredContent$, { initialValue: initialState.featuredContent })
  public readonly catalogItems = toSignal(this.appStore.catalogItems$, { initialValue: [null, null, null, null, null] })
  public readonly isLoading = toSignal(this.appStore.isLoading$, { initialValue: initialState.isLoading })
  constructor(public readonly appStore: AppStore) {

  }
}
