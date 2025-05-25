import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedComponent } from './featured.component';
import { By } from '@angular/platform-browser';

describe('FeaturedComponent', () => {
  let component: FeaturedComponent;
  let fixture: ComponentFixture<FeaturedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeaturedComponent]
    });
    fixture = TestBed.createComponent(FeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the featured title', () => {
    fixture.componentRef.setInput('featuredContentTitle', 'Test Game');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.title');
    expect(title.textContent).toContain('Test Game');
  });

  it('should apply placeholder class when loading', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    const content = fixture.debugElement.query(By.css('.featured-content'));
    expect(content.classes['placeholder']).toBeTrue();
  });

  it('should render the featured image with correct src and alt', () => {
    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('featuredContent', { featuredImage: 'test.jpg' });
    fixture.componentRef.setInput('featuredContentTitle', 'Test');
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('.featured-image'));
    expect(img).toBeTruthy();
    expect(img.attributes['ng-reflect-ng-src'] || img.nativeElement.src).toContain('test.jpg');
    expect(img.attributes['alt']).toBe('Test');
  });

  it('should render the secret button but keep it invisible', () => {
    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('featuredContent', {
      featuredImage: 'test.jpg',
      featuredGame: { id: '1', title: 'Test Game', thumbnail: 'test.jpg', price: 10, discount: null }
    });
    fixture.componentRef.setInput('isActionDisabled', true);
    fixture.detectChanges();
    const secretBtn = fixture.nativeElement.querySelector('.secret-btn');
    expect(secretBtn).toBeTruthy();
    const style = getComputedStyle(secretBtn);
    expect(style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0').toBeTrue();
  });

  it('should disable the secret button when isActionDisabled is true', () => {
    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('featuredContent', {
      featuredImage: 'test.jpg',
      featuredGame: { id: '1', title: 'Test Game', thumbnail: 'test.jpg', price: 10, discount: null }
    });
    fixture.componentRef.setInput('isActionDisabled', true);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.secret-btn')).nativeElement;
    expect(btn.disabled).toBeTrue();
  });

  it('should emit addToCart with the featured game id when button is clicked', () => {
    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('featuredContent', {
      featuredImage: 'test.jpg',
      featuredGame: { id: '1', title: 'Test Game', thumbnail: 'test.jpg', price: 10, discount: null }
    });
    spyOn(component, 'handleAddToCart').and.callThrough();
    spyOn(component.addToCart, 'emit');
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    btn.nativeElement.click();
    expect(component.handleAddToCart).toHaveBeenCalled();
    expect(component.addToCart.emit).toHaveBeenCalledWith('1');
  });
});
