import {Component, Input, OnInit} from '@angular/core';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';

@Component({
  selector: 'app-synopsis-object-toolbox',
  templateUrl: './synopsis-object-toolbox.component.html',
  styleUrls: ['./synopsis-object-toolbox.component.scss']
})
export class SynopsisObjectToolboxComponent implements OnInit {

  @Input() uid: number;

  constructor(private synopsisObjectModifierService: SynopsisObjectModifierService) {
  }

  ngOnInit() {
  }

  closeObject() {
    this.synopsisObjectModifierService.closeObject(this.uid);
  }

}
