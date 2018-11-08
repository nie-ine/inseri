import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private firstTimeLaunch = false;

  constructor() { }

  appLaunched() {
    this.firstTimeLaunch = false;
  }

  isAppLaunchingFirstTime(): boolean {
    return this.firstTimeLaunch;
  }
}
