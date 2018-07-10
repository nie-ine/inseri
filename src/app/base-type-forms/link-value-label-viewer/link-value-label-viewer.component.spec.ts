import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkValueLabelViewerComponent } from './link-value-label-viewer.component';
import { KnoraV1RequestService } from '../../shared/knora-v1-request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LinkValueLabelViewerComponent', () => {
  let component: LinkValueLabelViewerComponent;
  let fixture: ComponentFixture<LinkValueLabelViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkValueLabelViewerComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ KnoraV1RequestService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkValueLabelViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
