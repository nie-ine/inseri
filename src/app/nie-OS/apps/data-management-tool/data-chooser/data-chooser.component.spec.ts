import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataChooserComponent } from './data-chooser.component';

describe('DataChooserComponent', () => {
  let component: DataChooserComponent;
  let fixture: ComponentFixture<DataChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
