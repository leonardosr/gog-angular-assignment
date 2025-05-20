import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFeaturedContent } from 'src/interfaces/featured-content';

@Component({
  selector: 'app-featured',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {
  public readonly title = input<string>()
  public readonly featuredContent = input<IFeaturedContent>()
}
