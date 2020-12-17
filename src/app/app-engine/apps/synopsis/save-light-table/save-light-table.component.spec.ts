import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SaveLightTableComponent} from './save-light-table.component';
import {MatDialogRef, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {SynopsisObjectSerializerServiceStub} from '../stubs/synopsis-object-serializer-service-stub';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SaveLightTableComponent', () => {
  let component: SaveLightTableComponent;
  let fixture: ComponentFixture<SaveLightTableComponent>;
  const synopsisObjectSerializerServiceStub = new SynopsisObjectSerializerServiceStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [SaveLightTableComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: SynopsisObjectSerializerService, useValue: synopsisObjectSerializerServiceStub}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
