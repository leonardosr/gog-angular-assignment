import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogItemComponent } from './catalog-item.component';
import { By } from '@angular/platform-browser';

describe('CatalogItemComponent', () => {
  let component: CatalogItemComponent;
  let fixture: ComponentFixture<CatalogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the game title', () => {
    fixture.componentRef.setInput('item', {
      game: { id: '1', title: 'Test Game', thumbnail: 'test.jpg', price: 10, discount: null },
      isInCart: false,
      isInLibrary: false
    });
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.item-title'));
    expect(title.nativeElement.textContent).toContain('Test Game');
  });

  it('should render the game image with correct alt', () => {
    fixture.componentRef.setInput('item', {
      game: { id: '1', title: 'Test Game', thumbnail: 'test.jpg', price: 10, discount: null },
      isInCart: false,
      isInLibrary: false
    });
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('.item-thumbnail'));
    expect(img).toBeTruthy();
    expect(img.attributes['alt']).toBe('Test Game');
  });

  it('should show "IN CART" badge if isInCart is true', () => {
    fixture.componentRef.setInput('item', {
      game: { id: '1', title: 'Test Game', thumbnail: 'test.jpg', price: 10, discount: null },
      isInCart: true,
      isInLibrary: false
    });
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.badge-outline-dark'));
    expect(badge.nativeElement.textContent).toContain('In Cart');
  });

  it('should show "Owned" badge if isInLibrary is true', () => {
    fixture.componentRef.setInput('item', {
      game: { id: '1', title: 'Test Game', thumbnail: 'test.jpg', price: 10, discount: null },
      isInCart: false,
      isInLibrary: true
    });
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.badge-outline-gray'));
    expect(badge.nativeElement.textContent).toContain('Owned');
  });

  it('should emit handleAddToCart when button is clicked', () => {
    fixture.componentRef.setInput('item', {
      game: { id: '1', title: 'Test Game', thumbnail: 'test.jpg', price: 10, discount: null },
      isInCart: false,
      isInLibrary: false
    });
    spyOn(component, 'handleAddToCart');
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    btn.nativeElement.click();
    expect(component.handleAddToCart).toHaveBeenCalledWith('1');
  });
});