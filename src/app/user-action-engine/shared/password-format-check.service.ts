import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordFormatCheckService {

  /**
   * Special characters for passwords. Shown in GUI and used in check.
   */
  neededSpecialCharacters = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

  constructor() { }

  /**
   * Check if a candidate for a new password fulfils some typical password-specific requirements.
   * True if the password is valid, false if the password is invalid.
   * @param password: the candidate for the new password
   */
  checkProposedPassword(password): boolean {
    let isValidPassword = true;

    // Reject passwords without upper-case letters.
    if (/[A-Z]/.test(password) === false) {
      isValidPassword = false;
    }

    // Reject passwords without lower-case letters.
    if (/[a-z]/.test(password) === false) {
      isValidPassword = false;
    }

    // Reject passwords without numbers.
    if (/[0-9]/.test(password) === false) {
      isValidPassword = false;
    }

    // Reject passwords without special characters.
    const setOfSpecials = new RegExp('[' + this.neededSpecialCharacters + ']');
    if (setOfSpecials.test(password) === false) {
      isValidPassword = false;
    }

    // Reject passwords that are shorter than 9 characters.
    if (password.length < 9) {
      isValidPassword = false;
    }

    return isValidPassword;
  }
}
