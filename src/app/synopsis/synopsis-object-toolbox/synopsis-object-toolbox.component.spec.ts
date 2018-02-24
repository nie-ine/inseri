import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisObjectToolboxComponent } from './synopsis-object-toolbox.component';

describe('SynopsisObjectToolboxComponent', () => {
  let component: SynopsisObjectToolboxComponent;
  let fixture: ComponentFixture<SynopsisObjectToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopsisObjectToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisObjectToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
