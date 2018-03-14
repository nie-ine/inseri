import {Component, OnInit} from '@angular/core';
import {CanvasOptionsService} from '../canvas-options.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-text-view-tools',
  templateUrl: './text-view-tools.component.html',
  styleUrls: ['./text-view-tools.component.scss']
})
export class TextViewToolsComponent implements OnInit {

  toolbox: FormGroup;

  matcher = new MyErrorStateMatcher();
  numberOfMatches: number;

  constructor(public canvasOptionsService: CanvasOptionsService, private formBuilder: FormBuilder) {
    this.toolbox = formBuilder.group({
      nightView: false,
      fontSize: [100, [Validators.required, Validators.max(500), Validators.min(25)]],
      find: ''
    });
    this.toolbox.get('nightView').valueChanges.subscribe(() => canvasOptionsService.toggleNightView());
    this.toolbox.get('fontSize').valueChanges.subscribe(size => canvasOptionsService.changeFontSize(size));
    this.toolbox.get('find').valueChanges.subscribe(term => {
      const t = term.length >= 3 ? term : '';
      this.canvasOptionsService.find(t);
    });
    this.canvasOptionsService.numberOfMatches$.subscribe(matches => this.numberOfMatches = matches);
    // this.toolbox.get('clearFind').valueChanges.subscribe(x => this.canvasOptionsService.clearFind());
  }

  ngOnInit() {
  }

  shiftIndexOfFocus(increase: boolean) {
    this.canvasOptionsService.shiftIndexOfFocus(increase);
  }

  clearFind() {
    this.toolbox.get('find').setValue('');
  }

}
