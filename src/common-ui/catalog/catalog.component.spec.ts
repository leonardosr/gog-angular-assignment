import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { ICatalogItem } from 'src/interfaces/catalog-item.interface';
import { By } from '@angular/platform-browser';

const TEST_GAME_1 = { id: '1', title: 'Game 1', thumbnail: '', price: 10, discount: null };
const TEST_GAME_2 = { id: '2', title: 'Game 2', thumbnail: '', price: 20, discount: 10 };
const TEST_CATALOG_ITEM_1: ICatalogItem = {
  game: TEST_GAME_1,
  isInCart: false,
  isInLibrary: false,
  isPending: false
};
const TEST_CATALOG_ITEM_2: ICatalogItem = {
  game: TEST_GAME_2,
  isInCart: false,
  isInLibrary: false,
  isPending: false
};
const TEST_CATALOG_ITEMS: ICatalogItem[] = [TEST_CATALOG_ITEM_1, TEST_CATALOG_ITEM_2];

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
    fixture.componentRef.setInput('items', TEST_CATALOG_ITEMS);
    fixture.detectChanges();
    const catalogItems = fixture.debugElement.queryAll(By.css('app-catalog-item'));
    expect(catalogItems.length).toBe(2);
  });

  it('should emit addToCart event when a child emits', () => {
    spyOn(component.addToCart, 'emit');
    fixture.componentRef.setInput('items', [TEST_CATALOG_ITEM_1]);
    fixture.detectChanges();
    const childComponent = fixture.debugElement.query(By.css('app-catalog-item')).componentInstance;
    childComponent.addToCart.emit(TEST_GAME_1.id);
    expect(component.addToCart.emit).toHaveBeenCalledWith(TEST_GAME_1.id);
  });

  it('should pass isLoading to catalog items', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.componentRef.setInput('items', [TEST_CATALOG_ITEM_1]);
    fixture.detectChanges();
    const childComponent = fixture.debugElement.query(By.css('app-catalog-item')).componentInstance;
    expect(childComponent.isLoading()).toBeTrue();
  });
});