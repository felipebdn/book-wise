export class TextComment {
  public value: string
  constructor(value: string) {
    this.value = value
  }

  /**
   * receives a string and returns it summarized
   * @param text {string}
   */
  static createFromText(text: string) {
    return new TextComment(text)
  }
}
