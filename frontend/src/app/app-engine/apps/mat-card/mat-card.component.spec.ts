import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardComponent } from './mat-card.component';

describe('MatCardComponent', () => {
  let component: MatCardComponent;
  let fixture: ComponentFixture<MatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
