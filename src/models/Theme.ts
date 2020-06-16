export default class ThemeStorageUtil {
  static setTheme(newTheme: string) {
    localStorage.setItem("theme", newTheme);
  }

  static getTheme() {
    const theme = localStorage.getItem("theme");

    if (theme !== null) {
      return theme;
    }
  }
}
