import { Injectable } from '@angular/core';

@Injectable()
export class GenerateHashService {
  constructor(
  ) { }
  generateHash(): string {
    console.log('generate Hash');
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(
        Math.floor(Math.random() * possible.length )
      );
    }
    return text;
  }
}
