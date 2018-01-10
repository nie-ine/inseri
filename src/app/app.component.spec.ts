import { TestBed, async } from '@angular/core/testing';
import { CoreModule } from './core/core.module';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
	    imports: [ CoreModule ],
      declarations: [
				AppComponent
			],
			providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
