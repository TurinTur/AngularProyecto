import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdNavbarComponent } from './bd-navbar.component';

describe('BdNavbarComponent', () => {
  let component: BdNavbarComponent;
  let fixture: ComponentFixture<BdNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
