import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JoinedTextTextwrapperComponent } from './joined-text-textwrapper.component';

describe('JoinedTextTextwrapperComponent', () => {
  let component: JoinedTextTextwrapperComponent;
  let fixture: ComponentFixture<JoinedTextTextwrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTextTextwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedTextTextwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
