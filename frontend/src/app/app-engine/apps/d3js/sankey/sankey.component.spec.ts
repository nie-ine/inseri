import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SankeyComponent } from './sankey.component';

describe('SankeyComponent', () => {
  let component: SankeyComponent;
  let fixture: ComponentFixture<SankeyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SankeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SankeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
