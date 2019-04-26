/**
 * The class Token defines the input for interlinear glossing
 */
export class Token {
  /**
   * The literal content of the token
   */
  token: string;

  /**
   * A list of annotations
   */
  glosses: Array<string>;

  /**
   * Construct a new Token object
   * @param token  The literal content of the token
   * @param glosses  A list of annotations of the token
   */
  constructor(token: string, glosses: Array<string>) {
    this.token = token;
    this.glosses = glosses;
  }
}
