import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-light-table',
  templateUrl: './light-table.component.html',
  styleUrls: ['./light-table.component.scss']
})
export class LightTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onDrop(data: any) {
    console.log('Dropped ' + data);
  }

}
