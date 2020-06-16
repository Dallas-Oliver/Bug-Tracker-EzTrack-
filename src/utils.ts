import { AuthService as Auth } from "./auth/AuthService";

export class Utils {
  static buildFileSelector() {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute("accept", "image/x-png,image/gif,image/jpeg");

    return fileSelector;
  }
}
