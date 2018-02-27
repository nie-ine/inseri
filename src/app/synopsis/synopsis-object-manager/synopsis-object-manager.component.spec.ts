import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisObjectManagerComponent } from './synopsis-object-manager.component';

describe('SynopsisObjectManagerComponent', () => {
  let component: SynopsisObjectManagerComponent;
  let fixture: ComponentFixture<SynopsisObjectManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynopsisObjectManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisObjectManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
