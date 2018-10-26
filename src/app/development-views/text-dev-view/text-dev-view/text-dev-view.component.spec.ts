import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDevViewComponent } from './text-dev-view.component';
import { TextStructureModule } from '../../../nie-OS-apps/text-structure/text-structure.module';
import { SpaTextModule } from '../../../nie-OS-apps/shared/spa-text/spa-text.module';

describe('TextDevViewComponent', () => {
  let component: TextDevViewComponent;
  let fixture: ComponentFixture<TextDevViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDevViewComponent ],
      imports: [ TextStructureModule, SpaTextModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDevViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
