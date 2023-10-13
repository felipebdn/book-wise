export class TextComment {
  public value: string
  private constructor(value: string) {
    this.value = value
  }

  static create(comment: string) {
    return new TextComment(comment)
  }

  /**
   * receives a string and returns it summarized
   * @param text {string}
   */
  static createFromText(text: string) {
    return new TextComment(text)
  }
}
