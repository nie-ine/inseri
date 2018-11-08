import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LinkValueEditorComponent } from './link-value-editor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { KnoraV1RequestService } from '../../shared/knora/knora-v1-request.service';

describe('CreateLinkValueComponent', () => {
  let component: LinkValueEditorComponent;
  let fixture: ComponentFixture<LinkValueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      declarations: [ LinkValueEditorComponent ],
      providers: [ KnoraV1RequestService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkValueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
