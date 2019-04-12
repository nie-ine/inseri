export class Token {
  token: string;
  glosses: Array<string>;

  constructor(token: string, glosses: Array<string>) {
    this.token = token;
    this.glosses = glosses;
  }
}
