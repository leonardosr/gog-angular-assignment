import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { ICatalogItem } from 'src/interfaces/catalog-item.interface';
import { By } from '@angular/platform-browser';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalogComponent]
    });
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the correct number of catalog items', () => {
    const items: ICatalogItem[] = [
      { game: { id: '1', title: 'Game 1', thumbnail: '', price: 10, discount: null }, isInCart: false, isInLibrary: false, isPending: false },
      { game: { id: '2', title: 'Game 2', thumbnail: '', price: 20, discount: 10 }, isInCart: false, isInLibrary: false, isPending: false }
    ];
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    const catalogItems = fixture.debugElement.queryAll(By.css('app-catalog-item'));
    expect(catalogItems.length).toBe(2);
  });

  it('should emit addToCart event when a child emits', () => {
    spyOn(component.addToCart, 'emit');
    const items: ICatalogItem[] = [
      { game: { id: '1', title: 'Game 1', thumbnail: '', price: 10, discount: null }, isInCart: false, isInLibrary: false, isPending: false }
    ];
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    const childComponent = fixture.debugElement.query(By.css('app-catalog-item')).componentInstance;
    childComponent.addToCart.emit('1');
    expect(component.addToCart.emit).toHaveBeenCalledWith('1');
  });

  it('should pass isLoading to catalog items', () => {
    fixture.componentRef.setInput('isLoading', true);
    const items: ICatalogItem[] = [
      { game: { id: '1', title: 'Game 1', thumbnail: '', price: 10, discount: null }, isInCart: false, isInLibrary: false, isPending: false }
    ];
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    const childComponent = fixture.debugElement.query(By.css('app-catalog-item')).componentInstance;
    expect(childComponent.isLoading()).toBeTrue();
  });
});