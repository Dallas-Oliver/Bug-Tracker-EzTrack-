import { AuthService as Auth } from "./auth/AuthService";

export class Utils {
  static buildFileSelector() {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute(
      "accept",
      "image/x-png,image/gif,image/jpeg"
    );

    return fileSelector;
  }

  static async getUserPreferences() {
    const userId = Auth.getUserData()._id;
    try {
      const response = await Auth.fetch(`/users/${userId}/preferences`);

      if (!response) {
        console.log("something went wrong");
        return;
      }

      const userPreferences = await response.json();
      return userPreferences;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  static async updateColorPreference(hexValue) {
    let preferences = await this.getUserPreferences();

    if (!hexValue || typeof hexValue !== "string" || !preferences) {
      console.log("something went wrong");
      return;
    }

    preferences.colorScheme = hexValue;
    return this.updateUserPreferences(preferences);
  }

  static async updateUserPreferences(preferences) {
    const userId = Auth.getUserData()._id;

    try {
      const response = await Auth.fetch(
        `/users/${userId}/updatePreferences`,
        {
          method: "POST",
          body: JSON.stringify(preferences),
        }
      );

      if (!response) {
        console.log("preferences not set, something went wrong!");
        return;
      }

      const updatedPreferences = await response.json();
      return updatedPreferences;
    } catch (err) {
      console.log(err);
    }
  }
}
