import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightTableComponent } from './light-table.component';
import { SynopsisObjectModifierService } from '../synopsis-object-modifier.service';

describe('LightTableComponent', () => {
  let component: LightTableComponent;
  let fixture: ComponentFixture<LightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightTableComponent ],
      providers: [SynopsisObjectModifierService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
