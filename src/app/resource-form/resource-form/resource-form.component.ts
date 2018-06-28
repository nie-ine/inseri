import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {
  
  @Input() resourceIRI: string;

  constructor() { }

  ngOnInit() {
  }

}
