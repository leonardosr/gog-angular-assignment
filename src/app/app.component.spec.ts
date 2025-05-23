import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CartService } from 'src/services/cart.service';
import { ContentService } from 'src/services/content.service';
import { GameService } from 'src/services/game.service';
import { LibraryService } from 'src/services/library.service';
import { AppStore } from './app.component.store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppComponent],
    declarations: [],
    providers: [
      AppStore,
      GameService,
      LibraryService,
      CartService,
      ContentService,
      provideHttpClient(),
      provideHttpClientTesting()
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});