import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SynopsisObjectToolboxComponent } from './synopsis-object-toolbox.component';
import { MatIconModule } from '@angular/material';
import { SynopsisObjectModifierService } from '../synopsis-object-modifier.service';

describe('SynopsisObjectToolboxComponent', () => {
  let component: SynopsisObjectToolboxComponent;
  let fixture: ComponentFixture<SynopsisObjectToolboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      declarations: [SynopsisObjectToolboxComponent],
      providers: [{provide: SynopsisObjectModifierService, useValue: {}}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisObjectToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
