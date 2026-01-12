import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTextButtonComponent } from './navbar-text-button.component';

describe('NavbarTextButtonComponent', () => {
  let component: NavbarTextButtonComponent;
  let fixture: ComponentFixture<NavbarTextButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarTextButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarTextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
