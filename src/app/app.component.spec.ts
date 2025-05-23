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
  let fixture: ReturnType<typeof TestBed.createComponent<AppComponent>>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    });
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should render the navbar', () => {
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });

  it('should render the catalog', () => {
    expect(compiled.querySelector('app-catalog')).toBeTruthy();
  });

  it('should render the featured section', () => {
    expect(compiled.querySelector('app-featured')).toBeTruthy();
  });

  it('should render the mini cart', () => {
    expect(compiled.querySelector('app-mini-cart')).toBeTruthy();
  });
});