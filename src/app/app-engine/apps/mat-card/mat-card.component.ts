import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-mat-card',
  templateUrl: './mat-card.component.html',
  styleUrls: ['./mat-card.component.scss']
})
export class MatCardComponent implements OnChanges {
  @Input() backgroundImage;
  @Input() myTitle;
  @Input() subtitle;
  @Input() image;
  @Input() myDescription;
  @Input() mylink;


  constructor() { }

  ngOnChanges(): void {
  }

  navigateToSite() {
    window.open(this.mylink, '_blank');
  }

}
