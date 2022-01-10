import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyFilesComponent } from './my-files.component';

describe('MyFilesComponent', () => {
  let component: MyFilesComponent;
  let fixture: ComponentFixture<MyFilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
