import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaeberNavigationComponent } from './raeber-navigation.component';

describe('RaeberNavigationComponent', () => {
  let component: RaeberNavigationComponent;
  let fixture: ComponentFixture<RaeberNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaeberNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaeberNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
