import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlParamUpdaterComponent } from './url-param-updater.component';

describe('UrlParamUpdaterComponent', () => {
  let component: UrlParamUpdaterComponent;
  let fixture: ComponentFixture<UrlParamUpdaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlParamUpdaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlParamUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
