import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrisprComponent } from './crispr.component';

describe('CrisprComponent', () => {
  let component: CrisprComponent;
  let fixture: ComponentFixture<CrisprComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrisprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrisprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
