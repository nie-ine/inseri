import {Component} from '@angular/core';
import {ErrorStateMatcher, MatDialogRef} from '@angular/material';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';

export class InstantErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-synopsis-save-light-table',
  templateUrl: './synopsis-save-light-table.component.html',
  styleUrls: ['./synopsis-save-light-table.component.scss']
})
export class SynopsisSaveLightTableComponent {

  filenameFormControl = new FormControl('', [
    Validators.required,
    this.lookupReservedFilenames(this.synopsisObjectSerializerService.getAllFilenames())
  ]);

  matcher = new InstantErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<SynopsisSaveLightTableComponent>,
              private synopsisObjectSerializerService: SynopsisObjectSerializerService) {
  }

  lookupReservedFilenames(reservedFilenames: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return reservedFilenames.indexOf(control.value) > -1 ?
        {'reservedFilename': {value: control.value}} : null;
    };
  }

  saveAndCloseDialog() {
    this.synopsisObjectSerializerService.save(this.filenameFormControl.value);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
