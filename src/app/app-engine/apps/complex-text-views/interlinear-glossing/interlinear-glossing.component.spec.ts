import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterlinearGlossingComponent } from './interlinear-glossing.component';

describe('InterlinearGlossingComponent', () => {
  let component: InterlinearGlossingComponent;
  let fixture: ComponentFixture<InterlinearGlossingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterlinearGlossingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterlinearGlossingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
