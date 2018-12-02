import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAppInputMapComponent } from './query-app-input-map.component';

describe('QueryAppInputMapComponent', () => {
  let component: QueryAppInputMapComponent;
  let fixture: ComponentFixture<QueryAppInputMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryAppInputMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryAppInputMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
