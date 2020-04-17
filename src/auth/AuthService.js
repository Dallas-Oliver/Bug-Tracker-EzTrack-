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

    return response.json();
  }

  static async register(formData) {
    return await this.fetch(`/users/register`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }

  static async login(email, password) {
    // Get a token from api server using the fetch api
    const jsonResponse = await this.fetch(`/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (jsonResponse) {
      this.setToken(jsonResponse.token);
      return jsonResponse;
    }
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
    localStorage.removeItem("id_token");
  }

  static getUserData() {
    return decode(this.getToken());
  }
}
