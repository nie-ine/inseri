import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {
  
  @Input() property: any:

  @Output() value_structure = new EventEmitter<any>;
  
  datatype: string;

  constructor() { }

  ngOnInit() {
    
    
  }

}
