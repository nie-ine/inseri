import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TextViewCanvasComponent} from './text-view-canvas.component';
import {StandoffReconcilerService} from '../../standoff/standoff-reconciler.service';
import {CanvasOptionsService} from '../canvas-options.service';
import {Subject} from 'rxjs/Subject';

describe('TextViewCanvasComponent', () => {
  let component: TextViewCanvasComponent;
  let fixture: ComponentFixture<TextViewCanvasComponent>;
  const standoffReconcilerServiceStub = {};
  const canvasOptionsServiceStub = {
    nightView$: new Subject<boolean>().asObservable(),
    fontSize$: new Subject<number>().asObservable(),
    term$: new Subject<string>().asObservable(),
    shiftIndexOfFocus$: new Subject<boolean>().asObservable()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextViewCanvasComponent],
      providers: [
        {provide: StandoffReconcilerService, useValue: standoffReconcilerServiceStub},
        {provide: CanvasOptionsService, useValue: canvasOptionsServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextViewCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
