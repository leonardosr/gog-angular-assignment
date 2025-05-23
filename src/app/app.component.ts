import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavbarComponent } from '../comon-ui/navbar/navbar.component';
import { FeaturedComponent } from '../comon-ui/featured/featured.component';
import { CatalogComponent } from 'src/comon-ui/catalog/catalog.component';
import { AppStore, initialState } from './app.component.store';
import { GameService } from 'src/services/game.service';
import { LibraryService } from 'src/services/library.service';
import { CartService } from 'src/services/cart.service';
import { MiniCartComponent } from '../comon-ui/mini-cart/mini-cart.component';
import { ContentService } from 'src/services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, FeaturedComponent, CatalogComponent, MiniCartComponent],
  providers: [AppStore, GameService, LibraryService, CartService, ContentService]
})
export class AppComponent implements OnInit {
  public readonly featuredContent = toSignal(this.appStore.featuredContent$, { initialValue: initialState.featuredContent.content });
  public readonly catalogItems = toSignal(this.appStore.catalogItems$, { initialValue: [null, null, null, null, null] });
  public readonly cartItems = toSignal(this.appStore.cartItems$, { initialValue: [] });
  public readonly isGameListLoading = toSignal(this.appStore.isGameListLoading$, { initialValue: initialState.gameList.isLoading });
  public readonly isCartLoading = toSignal(this.appStore.isGameListLoading$, { initialValue: initialState.cart.isLoading });
  public readonly isFetauredContentLoading = toSignal(this.appStore.isGameListLoading$, { initialValue: initialState.gameList.isLoading });
  constructor(public readonly appStore: AppStore) {

  }

  public ngOnInit() {
    this.appStore.loadFeaturedContent();
    this.appStore.loadLibrary();
    this.appStore.loadCart();
    this.appStore.loadGames();
  }

  public handleClearCart() {
    this.appStore.clearCart();
  }

  public handleRemoveItem(itemId: string) {
    this.appStore.removeFromCart({ itemId });
  }

  public handleAddToCart(gameId: string) {
    this.appStore.addTocart({ gameId });
  }
}
