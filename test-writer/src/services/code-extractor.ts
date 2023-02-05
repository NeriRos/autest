import fs from "fs";

class CodeExtractor {
  private data: string;

  constructor(private path: string) {
    this.data = fs.readFileSync(path, "utf8");
  }

  getFileType() {}

  getElements() {
    return this.data;
  }
}

export default CodeExtractor;
