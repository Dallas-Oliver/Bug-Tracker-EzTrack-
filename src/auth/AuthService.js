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

  static async register(user) {
    const response = await this.fetch(`/users/register`, {
      method: "POST",
      body: JSON.stringify(user),
    });

    const json = await response.json();

    return json;
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
      console.log(await response.json());
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
    return token && !this.isTokenExpired(token);
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

  static async getUserData() {
    try {
      const user_id = decode(this.getToken())._id;
      const response = await this.fetch(`/users/${user_id}`);

      if (!response) {
        console.log("no user info available");
        return;
      }

      const json = await response.json();
      const user = json.user;
      return user;
    } catch (err) {
      console.log("no user logged in!");
      return;
    }
  }
}
