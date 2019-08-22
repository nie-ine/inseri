import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchicalNavigationRootComponent } from './hierarchical-navigation-root.component';

describe('HierarchicalNavigationRootComponent', () => {
  let component: HierarchicalNavigationRootComponent;
  let fixture: ComponentFixture<HierarchicalNavigationRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchicalNavigationRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchicalNavigationRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
