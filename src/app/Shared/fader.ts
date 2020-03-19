export class Fader {

  public fadeIt = false;
  fade() {
    this.fadeIt = true;
    setTimeout((arg) => {
      // this.fadeIt = false;
    },
      500);
  }
}