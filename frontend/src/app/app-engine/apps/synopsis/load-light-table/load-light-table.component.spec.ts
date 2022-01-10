import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadLightTableComponent} from './load-light-table.component';
import {MatDialogRef, MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SynopsisObjectSerializerServiceStub} from '../stubs/synopsis-object-serializer-service-stub';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('LoadLightTableComponent', () => {
  let component: LoadLightTableComponent;
  let fixture: ComponentFixture<LoadLightTableComponent>;
  const synopsisObjectSerializerServiceStub = new SynopsisObjectSerializerServiceStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatSelectModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [LoadLightTableComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: SynopsisObjectSerializerService, useValue: synopsisObjectSerializerServiceStub}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
