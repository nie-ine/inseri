import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMenuComponent } from './page-menu.component';

describe('PageMenuComponent', () => {
  let component: PageMenuComponent;
  let fixture: ComponentFixture<PageMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
