import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedComponent } from './featured.component';
import { By } from '@angular/platform-browser';

describe('FeaturedComponent', () => {
  let fixture: ComponentFixture<FeaturedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeaturedComponent]
    });
    fixture = TestBed.createComponent(FeaturedComponent);
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

  it('should set background image style', () => {
    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('featuredContent', { featuredImage: 'test.jpg', title: 'Test' });
    fixture.detectChanges();
    const content = fixture.debugElement.query(By.css('.featured-content'));
    expect(content.styles['background-image']).toContain('test.jpg');
  });

  it('should render the secret button but keep it invisible', () => {
    const secretBtn = fixture.nativeElement.querySelector('.secret-btn');
    expect(secretBtn).toBeTruthy();
    const style = getComputedStyle(secretBtn);
    expect(style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0').toBeTrue();
  });
});
