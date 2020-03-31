import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagChipsComponent } from './tag-chips.component';
import { MaterialModule } from '../../../../../../material.module';
import { RouterModule } from '@angular/router';

describe('TagChipsComponent', () => {
  let component: TagChipsComponent;
  let fixture: ComponentFixture<TagChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagChipsComponent ],
      imports: [ MaterialModule, RouterModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
