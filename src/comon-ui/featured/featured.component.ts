import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFeaturedContent } from 'src/interfaces/featured-content';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {
  //public readonly featuredContent = input()
}
