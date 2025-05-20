import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../comon-ui/navbar/navbar.component";
import { FeaturedComponent } from "../comon-ui/featured/featured.component";
import { CatalogComponent } from 'src/comon-ui/catalog/catalog.component';
import { IFeaturedContent } from 'src/interfaces/featured-content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, FeaturedComponent, CatalogComponent]
})
export class AppComponent {
  title = 'gog-assignment';
  featuredContent: IFeaturedContent = {
    backgroundImageUrl: 'assets/_remote-assets/f85ecadb56c7f5270f50bd2a8e40ca0e4febb7cd.png'
  }
}
