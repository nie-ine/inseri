import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TreeNavigationComponent } from './tree-navigation.component';

describe('TreeNavigationComponent', () => {
  let component: TreeNavigationComponent;
  let fixture: ComponentFixture<TreeNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
