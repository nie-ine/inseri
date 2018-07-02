import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataViewComponent } from './metadata-view.component';
import { FactSheetModule } from '../../../fact-sheet/fact-sheet.module';
import { MaterialModule } from '../../../material.module';
import { TagChipsModule } from '../../../tag-chips/tag-chips.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('MetadataViewComponent', () => {
  let component: MetadataViewComponent;
  let fixture: ComponentFixture<MetadataViewComponent>;
  let tagChipList: HTMLElement;
  let tagChips: any[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataViewComponent ],
      imports: [
        FactSheetModule,
        MaterialModule,
        RouterTestingModule,
        TagChipsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    tagChipList = fixture.debugElement.query(By.css('app-tag-chips')).nativeElement;
    tagChips = fixture.debugElement.queryAll(By.css('mat-chip'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should contain child component app-tag-chips', () => {
    expect(tagChipList).toBeDefined();
  });

  it('should contain child component mat-chip', () => {
    expect(tagChips.length).toBe(component.tagInput.length);
  });
});
