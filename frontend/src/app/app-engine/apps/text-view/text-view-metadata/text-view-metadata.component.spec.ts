import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextViewMetadataComponent } from './text-view-metadata.component';

describe('TextViewMetadataComponent', () => {
  let component: TextViewMetadataComponent;
  let fixture: ComponentFixture<TextViewMetadataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextViewMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextViewMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
