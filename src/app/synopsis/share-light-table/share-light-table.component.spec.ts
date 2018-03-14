import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLightTableComponent } from './share-light-table.component';
import {MatDialogRef} from '@angular/material';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {SynopsisObjectSerializerServiceStub} from '../stubs/synopsis-object-serializer-service-stub';

describe('ShareLightTableComponent', () => {
  let component: ShareLightTableComponent;
  let fixture: ComponentFixture<ShareLightTableComponent>;
  const synopsisObjectSerializerServiceStub = new SynopsisObjectSerializerServiceStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareLightTableComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: SynopsisObjectSerializerService, useValue: synopsisObjectSerializerServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
