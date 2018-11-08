import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AceEditorModule } from 'ng2-ace-editor';

import { D3tutorialComponent } from './d3tutorial.component';

describe('D3tutorialComponent', () => {
  let component: D3tutorialComponent;
  let fixture: ComponentFixture<D3tutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AceEditorModule ],
      declarations: [ D3tutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
