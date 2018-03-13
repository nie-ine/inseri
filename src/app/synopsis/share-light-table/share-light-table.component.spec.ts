import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLightTableComponent } from './share-light-table.component';

describe('ShareLightTableComponent', () => {
  let component: ShareLightTableComponent;
  let fixture: ComponentFixture<ShareLightTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareLightTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareLightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
