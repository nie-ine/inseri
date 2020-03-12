import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListDialogComponent } from './page-list-dialog.component';

describe('PageListDialogComponent', () => {
  let component: PageListDialogComponent;
  let fixture: ComponentFixture<PageListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
