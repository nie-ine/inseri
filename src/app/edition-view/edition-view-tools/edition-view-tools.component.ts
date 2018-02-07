import { Component, OnInit } from '@angular/core';
import {CanvasOptionsService} from '../canvas-options.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edition-view-tools',
  templateUrl: './edition-view-tools.component.html',
  styleUrls: ['./edition-view-tools.component.scss']
})
export class EditionViewToolsComponent implements OnInit {

  toolbox: FormGroup;

  constructor(public canvasOptionsService: CanvasOptionsService, private formBuilder: FormBuilder) {
    this.toolbox = formBuilder.group({
      nightView: false,
      fontSize: [100, Validators.max(500)]}
      );
    this.toolbox.get('nightView').valueChanges.subscribe(v => canvasOptionsService.toggleNightView());
    this.toolbox.get('fontSize').valueChanges.subscribe(size => canvasOptionsService.changeFontSize(size));
  }

  ngOnInit() {
  }

}
