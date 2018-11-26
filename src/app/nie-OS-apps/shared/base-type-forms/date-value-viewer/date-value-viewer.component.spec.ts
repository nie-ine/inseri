import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateValueViewerComponent } from './date-value-viewer.component';

describe('DateTypeViewerComponent', () => {
  let component: DateValueViewerComponent;
  let fixture: ComponentFixture<DateValueViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateValueViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateValueViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
