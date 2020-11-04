import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchicalNavigationNodeComponent } from './hierarchical-navigation-node.component';

describe('HierarchicalNavigationNodeComponent', () => {
  let component: HierarchicalNavigationNodeComponent;
  let fixture: ComponentFixture<HierarchicalNavigationNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchicalNavigationNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchicalNavigationNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
