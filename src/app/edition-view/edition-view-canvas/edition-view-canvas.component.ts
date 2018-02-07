import {Component, Input, OnChanges} from '@angular/core';
import {StandoffReconcilerService} from '../../shared/standoff-reconciler.service';
import {Standoff} from '../../shared/models/standoff';
import {CanvasOptionsService} from '../canvas-options.service';

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
  nightView: boolean;
  fontSize = 100;

  constructor(private standoffReconcilerService: StandoffReconcilerService, private canvasOptionsService: CanvasOptionsService) {
    canvasOptionsService.nightView$.subscribe(state => this.nightView = state );
    canvasOptionsService.fontSize$.subscribe(size => this.fontSize = size);
  }

  ngOnChanges() {
    this.html = this.standoffReconcilerService.reconcile(this.text, this.standoffs);
  }

}
