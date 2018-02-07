import {Component, Input, OnChanges} from '@angular/core';
import {StandoffReconcilerService} from '../../shared/standoff-reconciler.service';
import {Standoff} from '../../shared/models/standoff';

@Component({
  selector: 'app-edition-view-canvas',
  templateUrl: './edition-view-canvas.component.html',
  styleUrls: ['./edition-view-canvas.component.scss'],
  providers: [StandoffReconcilerService]
})
export class EditionViewCanvasComponent implements OnChanges {

  @Input() text: string;
  @Input() standoffs: Standoff[];
  html: string;

  constructor(private standoffReconcilerService: StandoffReconcilerService) {
  }

  ngOnChanges() {
    this.html = this.standoffReconcilerService.reconcile(this.text, this.standoffs);
  }

}
