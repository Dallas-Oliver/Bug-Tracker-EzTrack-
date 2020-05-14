import decode from "jwt-decode";

export class AuthService {
  static async fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    // Setting Authorization header
    if (this.loggedIn()) {
      headers["Authorization"] = `Bearer ${this.getToken()}`;
    }
    const response = await fetch(url, {
      headers,
      ...options,
    });

    return response;
  }

  static async register(formData) {
    return await this.fetch(`/users/register`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }

  static async login(email, password) {
    // Get a token from server using the fetch api
    const response = await this.fetch(`/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status >= 400) {
      console.log(response);
      return response;
    }
    const json = await response.json();

    this.setToken(json.token);
    return response;
  }

  static setToken(token) {
    localStorage.setItem("id_token", token);
  }

  static getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  static loggedIn() {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  static isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  static logout() {
    try {
      localStorage.removeItem("id_token");
    } catch (err) {
      console.error(err);
      return;
    }
  }

  static getUserData() {
    try {
      return decode(this.getToken());
    } catch (err) {
      console.log("no user logged in!");
      return;
    }
  }

  static async getUserPreferences(userId) {
    try {
      const response = await this.fetch(`/users/${userId}/preferences`);

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
}
