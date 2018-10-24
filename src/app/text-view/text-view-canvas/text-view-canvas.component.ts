import {AfterViewChecked, Component, Input, OnChanges} from '@angular/core';
import {StandoffReconcilerService} from '../../shared/standoff/standoff-reconciler.service';
import {Standoff} from '../../shared/models/standoff';
import {CanvasOptionsService} from '../canvas-options.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-text-view-canvas',
  templateUrl: './text-view-canvas.component.html',
  styleUrls: ['./text-view-canvas.component.scss'],
  providers: [StandoffReconcilerService]
})
export class TextViewCanvasComponent implements OnChanges, AfterViewChecked {

  @Input() text: string;
  @Input() standoffs: Standoff[];

  standoffHtml: string;
  html: SafeHtml;
  nightView: boolean;
  fontSize = 100;
  numberOfMatches = 0;
  focusedMatchIndex = 1;
  private findTerm: string;
  private scroll = false;

  constructor(private standoffReconcilerService: StandoffReconcilerService,
              private canvasOptionsService: CanvasOptionsService,
              private domSanitizer: DomSanitizer) {
    canvasOptionsService.nightView$.subscribe(state => this.nightView = state);
    canvasOptionsService.fontSize$.subscribe(size => this.fontSize = size);
    canvasOptionsService.term$.subscribe(term => {
      this.findTerm = term;
      this.highlight();
    });
    this.canvasOptionsService.shiftIndexOfFocus$.subscribe(increase => increase ? this.increaseIndexOfFocus() : this.decreaseIndexOfFocus());
  }

  private static replaceAndCountOccurrences(text: string, regex: RegExp, selectIndex?: number): [string, number] {
    let counter = 0;
    return [text.replace(regex,
      (x) => '<span id="occ' + ++counter + '" class="highlight ' + (counter === selectIndex ? 'focused' : '') + '">' + x + '</span>'
    ), counter];
  }

  ngOnChanges() {
    this.updateText();
  }

  ngAfterViewChecked() {
    if (document.getElementsByClassName('focused')[0] && this.scroll) {
      document.getElementsByClassName('focused')[0].scrollIntoView();
      this.scroll = false;
    }
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
      this.canvasOptionsService.setNumberOfMatches(occurrences[1]);
      this.numberOfMatches = occurrences[1];
      this.scroll = true;
    }
  }

  private updateText() {
    this.standoffHtml = this.standoffReconcilerService.reconcile(this.text, this.standoffs);
    this.highlight();
  }

}
