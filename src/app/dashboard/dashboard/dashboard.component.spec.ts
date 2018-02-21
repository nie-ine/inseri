import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { DashboardComponent } from './dashboard.component';
import { MatDialog } from '@angular/material/dialog';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        // workaround: why I can't inject MatDialogRef in the unit test?
        {provide: MatDialog, useValue: {}}
  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
