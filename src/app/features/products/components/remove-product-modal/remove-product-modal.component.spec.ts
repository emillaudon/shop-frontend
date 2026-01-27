import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveProductModalComponent } from './remove-product-modal.component';

describe('RemoveProductModalComponent', () => {
  let component: RemoveProductModalComponent;
  let fixture: ComponentFixture<RemoveProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveProductModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
