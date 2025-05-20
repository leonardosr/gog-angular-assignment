import { Component } from '@angular/core';
import { NavbarComponent } from "../comon-ui/navbar/navbar.component";
import { FeaturedComponent } from "../comon-ui/featured/featured.component";
import { CatalogComponent } from 'src/comon-ui/catalog/catalog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NavbarComponent, FeaturedComponent, CatalogComponent]
})
export class AppComponent {
  title = 'gog-assignment';
}
