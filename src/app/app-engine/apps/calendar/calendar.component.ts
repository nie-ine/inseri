import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../../../user-action-engine/mongodb/auth/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit, OnChanges {
  @Input() calendarData: string;
  @Input() anotherInput: any;
  countArray: Array<any> = [];
  inputForApp = 'First input';
  userFirstName: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log( 'hello' );
    for ( let i = 0; i < 100; i++ ) {
      this.countArray.push( 'this is increment: ' + i );
    }
    // console.log( this.countArray );
    setTimeout(() => {
      this.inputForApp = this.anotherInput.test;
    }, 1000);
    this.myFirstFunction( 'test' );
  }

  myFirstFunction( input?: string ) {
    console.log('hello');
    this.authService.getUser( localStorage.getItem( 'userId' ) )
      .subscribe(
        data => {
          console.log( data );
          this.userFirstName = data.user.firstName;
        },
        error => console.log( error )
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log( changes );
  }

}
