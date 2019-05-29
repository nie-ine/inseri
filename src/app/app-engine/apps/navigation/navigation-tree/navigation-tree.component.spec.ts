import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTreeComponent } from './navigation-tree.component';

describe('NavigationTreeComponent', () => {
  let component: NavigationTreeComponent;
  let fixture: ComponentFixture<NavigationTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
