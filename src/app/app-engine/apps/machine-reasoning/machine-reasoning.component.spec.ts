import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineReasoningComponent } from './machine-reasoning.component';

describe('MachineReasoningComponent', () => {
  let component: MachineReasoningComponent;
  let fixture: ComponentFixture<MachineReasoningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineReasoningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineReasoningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
