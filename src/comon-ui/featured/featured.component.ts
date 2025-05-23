import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFeaturedContent } from 'src/interfaces/featured-content.interface';

@Component({
  selector: 'app-featured',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {
  public readonly featuredContentTitle = input<string>()
  public readonly isLoading = input<boolean>(false);
  public readonly featuredContent = input<IFeaturedContent | null>();
  public readonly featuredBackgroundImage = computed(() => {
    const backgroundImage = this.featuredContent()?.backgroundImageUrl;
    return backgroundImage ? `url(${backgroundImage})` : 'none';
  });
}
