import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchicalNavigationViewComponent } from './hierarchical-navigation-view.component';

describe('HierarchicalNavigationViewComponent', () => {
  let component: HierarchicalNavigationViewComponent;
  let fixture: ComponentFixture<HierarchicalNavigationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchicalNavigationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchicalNavigationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
