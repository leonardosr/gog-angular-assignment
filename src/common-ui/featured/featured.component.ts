import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IContent } from 'src/interfaces/featured-content.interface';

@Component({
  selector: 'app-featured',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {
  public readonly featuredContentTitle = input<string>()
  public readonly isLoading = input<boolean>(false);
  public readonly featuredContent = input<IContent | null>();
  public readonly featuredImage = computed(() => {
    const featuredImage = this.featuredContent()?.featuredImage;
    return featuredImage ?? null;
  });
}
