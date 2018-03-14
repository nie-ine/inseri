import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NIEOSComponent } from './nie-OS.component';

describe('GrapesjsComponent', () => {
  let component: NIEOSComponent;
  let fixture: ComponentFixture<NIEOSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NIEOSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NIEOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeFalsy();
  // });
});
