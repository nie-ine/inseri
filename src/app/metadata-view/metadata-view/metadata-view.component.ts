import { Component, OnInit } from '@angular/core';
import { SubjectTag } from '../tag-chips/tag-chips/tag';

@Component({
  selector: 'app-metadata-view',
  templateUrl: './metadata-view.component.html',
  styleUrls: ['./metadata-view.component.scss']
})
export class MetadataViewComponent implements OnInit {

  tagInput: Array<SubjectTag> = [];

  tagData = [
    {'linkpart': 'a', 'tagName': 'Ameisen'},
    {'linkpart': 'b', 'tagName': 'Baeume'},
    {'linkpart': 'c', 'tagName': 'Christentum'}
    ];

  constructor() { }

  ngOnInit() {
    for (let d = 0; d < this.tagData.length; d++) {
      this.tagInput.push(new SubjectTag(this.tagData[d].linkpart, d.toString(), this.tagData[d].tagName));
    }
  }

}
