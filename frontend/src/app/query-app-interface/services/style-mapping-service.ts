/**
 * This service is part of a proof of concept for page specific css,
 * maintained by github user domsteinbach
 * */

import { Injectable } from '@angular/core';

@Injectable()

export class StyleMappingService {
  constructor() {
  }

  cssMapping = {
    '5c5451034e5d17001e394c82': 'p_00001.css',
    'someOtherUserId': 'p_00002.css'
  };

  public getUserCss() {
    let userCss;
    const userId = localStorage.getItem('userId');
    if (userId) {
      for (const key in this.cssMapping) {
        if (key === userId) {
          userCss = './assets/css/project-styles/' + this.cssMapping[key];
        }
      }
      if (userCss) {
        console.log('applying project css ' + userCss);
        return userCss;
      } else {
          console.log('no project css found for user ' + userId + '. Fall back to default style.');
          return './assets/css/project-styles/p_00000.css'; }
    }
  }
}
