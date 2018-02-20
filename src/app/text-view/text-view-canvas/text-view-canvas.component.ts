import {Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {StandoffReconcilerService} from '../../shared/standoff-reconciler.service';
import {Standoff} from '../../shared/models/standoff';
import {CanvasOptionsService} from '../canvas-options.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-text-view-canvas',
  templateUrl: './text-view-canvas.component.html',
  styleUrls: ['./text-view-canvas.component.scss'],
  providers: [StandoffReconcilerService]
})
export class TextViewCanvasComponent implements OnChanges {

  @Input() text: string;
  @Input() standoffs: Standoff[];

  standoffHtml: string;
  html: SafeHtml;
  nightView: boolean;
  fontSize = 100;
  private findTerm: string;
  numberOfMatches = 0;
  focusedMatchIndex = 1;

  private static replaceAndCountOccurrences(text: string, regex: RegExp, selectIndex?: number): [string, number] {
    let counter = 0;
    return [text.replace(regex,
      (x) => '<span id="occ' + ++counter + '" class="highlight ' + (counter === selectIndex ? 'focused' : '') + '">' + x + '</span>'
    ), counter];
  }

  constructor(private standoffReconcilerService: StandoffReconcilerService, private canvasOptionsService: CanvasOptionsService, private domSanitizer: DomSanitizer) {
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

  decreaseIndexOfFocus() {
    this.focusedMatchIndex = ((this.focusedMatchIndex - 1) <= 0) ? this.numberOfMatches : this.focusedMatchIndex - 1;
    this.highlight();
  }

  increaseIndexOfFocus() {
    this.focusedMatchIndex = ((this.focusedMatchIndex + 1) > this.numberOfMatches) ? 1 : this.focusedMatchIndex + 1;
    this.highlight();
  }

  private highlight() {
    if (!this.findTerm || this.findTerm === '') {
      this.html = this.standoffHtml;
      this.numberOfMatches = 0;
    } else {
      const regex = new RegExp('(' + this.findTerm + ')', 'gi');
      const occurrences = TextViewCanvasComponent.replaceAndCountOccurrences(this.standoffHtml, regex, this.focusedMatchIndex);
      this.html = this.domSanitizer.bypassSecurityTrustHtml(occurrences[0]);
      this.numberOfMatches = occurrences[1];
    }
  }

  private updateText() {
    this.standoffHtml = this.standoffReconcilerService.reconcile(this.text, this.standoffs);
    this.highlight();
  }

}
