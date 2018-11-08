import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { ResourceFormModule } from '../../../resource-form/resource-form.module';

import { EditResourceViewComponent } from './edit-resource-view.component';
import { KnoraV1RequestService } from '../../../shared/knora/knora-v1-request.service';

describe('EditResourceViewComponent', () => {
  let component: EditResourceViewComponent;
  let fixture: ComponentFixture<EditResourceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResourceViewComponent ],
      imports: [ FormsModule, ResourceFormModule, HttpClientModule, HttpClientTestingModule ],
      providers: [ KnoraV1RequestService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResourceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
