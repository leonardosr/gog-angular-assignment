import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IContent } from 'src/interfaces/featured-content.interface';

@Component({
  selector: 'app-featured',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {
  public readonly featuredContentTitle = input<string>()
  public readonly isLoading = input<boolean>(false);
  public readonly featuredContent = input<IContent | null>();
  public readonly featuredBackgroundImage = computed(() => {
    const backgroundImage = this.featuredContent()?.featuredImage;
    return backgroundImage ? `url(${backgroundImage})` : 'none';
  });
}
