import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UrlParamUpdaterComponent } from './url-param-updater.component';

describe('UrlParamUpdaterComponent', () => {
  let component: UrlParamUpdaterComponent;
  let fixture: ComponentFixture<UrlParamUpdaterComponent>;

  beforeEach(waitForAsync(() => {
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
