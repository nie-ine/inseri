import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataChooserSettingsComponent } from './data-chooser-settings.component';

describe('DataChooserSettingsComponent', () => {
  let component: DataChooserSettingsComponent;
  let fixture: ComponentFixture<DataChooserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataChooserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataChooserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
