import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadProductsButtonComponent } from './load-products-button.component';

describe('LoadProductsButtonComponent', () => {
  let component: LoadProductsButtonComponent;
  let fixture: ComponentFixture<LoadProductsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadProductsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadProductsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
