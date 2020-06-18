export default class LocalStorageUtil {
  static setItem(itemName: string, item: string) {
    localStorage.setItem(itemName, item);
  }

  static getItemFromStorage(itemName: string) {
    const item = localStorage.getItem(itemName);

    if (item !== null) {
      return item;
    }
  }
}
