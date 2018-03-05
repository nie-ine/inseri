import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SynopsisMenuComponent} from './synopsis-menu.component';
import {MatDialogModule, MatIconModule, MatMenuModule} from '@angular/material';

describe('SynopsisMenuComponent', () => {
  let component: SynopsisMenuComponent;
  let fixture: ComponentFixture<SynopsisMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [SynopsisMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
