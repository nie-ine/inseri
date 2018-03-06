import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LightTableMenuComponent} from './light-table-menu.component';
import {MatButtonModule, MatDialogModule, MatIconModule, MatMenuModule} from '@angular/material';
import {LightTableLayoutService} from '../light-table-layout.service';

describe('LightTableMenuComponent', () => {
  let component: LightTableMenuComponent;
  let fixture: ComponentFixture<LightTableMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [LightTableMenuComponent],
      providers: [LightTableLayoutService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightTableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
