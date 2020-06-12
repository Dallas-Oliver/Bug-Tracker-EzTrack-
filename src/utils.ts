import { AuthService as Auth } from "./auth/AuthService";

export class Utils {
  static buildFileSelector() {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute("accept", "image/x-png,image/gif,image/jpeg");

    return fileSelector;
  }

  static async getUserPreferences() {
    const user = await Auth.getUserData();
    const userId = await user._id;
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

  // static async updateUserPreferences(preferences) {
  //   const userId = Auth.getUserData()._id;

  //   try {
  //     const response = await Auth.fetch(`/users/${userId}/updatePreferences`, {
  //       method: "POST",
  //       body: JSON.stringify(preferences),
  //     });

  //     if (!response) {
  //       console.log("preferences not set, something went wrong!");
  //       return;
  //     }

  //     const updatedPreferences = await response.json();
  //     return updatedPreferences;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
