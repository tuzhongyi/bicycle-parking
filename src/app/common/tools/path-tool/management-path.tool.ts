export class PathToolManagement {
  constructor(private node: string) {}

  video(filename: string) {
    return `${this.node}/assets/config/video/${filename}.mp4`;
  }
}
