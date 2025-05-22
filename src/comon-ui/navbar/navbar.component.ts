import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MiniCartComponent } from "../mini-cart/mini-cart.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MiniCartComponent],
})
export class NavbarComponent {

}
