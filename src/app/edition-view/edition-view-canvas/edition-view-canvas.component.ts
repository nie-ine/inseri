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
  standoffHtml: string;
  html: string;
  nightView: boolean;
  fontSize = 100;
  private findTerm: string;

  constructor(private standoffReconcilerService: StandoffReconcilerService, private canvasOptionsService: CanvasOptionsService) {
    canvasOptionsService.nightView$.subscribe(state => this.nightView = state);
    canvasOptionsService.fontSize$.subscribe(size => this.fontSize = size);
    canvasOptionsService.term$.subscribe(term => {
      this.findTerm = term;
      this.highlight();
    });
  }

  ngOnChanges() {
    this.updateText();
  }

  private highlight() {
    const regex = new RegExp('(' + this.findTerm + ')', 'gi');
    this.html = (!this.findTerm || this.findTerm === '') ? this.standoffHtml : this.standoffHtml.replace(regex, '<span class="highlight">$1</span>');
  }

  private updateText() {
    this.standoffHtml = this.standoffReconcilerService.reconcile(this.text, this.standoffs);
    this.highlight();
  }
}
