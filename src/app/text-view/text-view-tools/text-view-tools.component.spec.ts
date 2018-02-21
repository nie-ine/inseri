import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TextViewToolsComponent} from './text-view-tools.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {CanvasOptionsService} from '../canvas-options.service';
import {Subject} from 'rxjs/Subject';

describe('TextViewToolsComponent', () => {
  let component: TextViewToolsComponent;
  let fixture: ComponentFixture<TextViewToolsComponent>;
  const canvasOptionsServiceMock = {
    numberOfMatches$: new Subject<number>().asObservable()
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextViewToolsComponent],
      imports: [ReactiveFormsModule, FormsModule, MaterialModule],
      providers: [{provide: CanvasOptionsService, useValue: canvasOptionsServiceMock}]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextViewToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
