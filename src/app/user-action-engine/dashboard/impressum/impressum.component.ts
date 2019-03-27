import { Component, OnInit } from '@angular/core';
import { TermsAndConditions } from '../../register/termsAndConditions/termsAndConditions';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html'
})
export class ImpressumComponent {
  constructor(
    public termsAndConditions: TermsAndConditions
  ) {
  }

}
