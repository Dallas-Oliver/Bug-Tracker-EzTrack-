import decode from "jwt-decode";

export default class AuthService {
  constructor(domain) {
    this.domain = domain || "http://localhost:5000";
  }

  async fetch(url, options) {
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

  async register(formData) {
    return await this.fetch(`${this.domain}/users/register`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }

  login(email, password) {
    // Get a token from api server using the fetch api

    return this.fetch(`${this.domain}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      this.setToken(res.token); // Setting the token in localStorage
      return Promise.resolve(res);
    });
  }

  setToken(token) {
    localStorage.setItem("id_token", token);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  loggedIn() {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  isTokenExpired(token) {
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

  logout() {
    localStorage.removeItem("id_token");
  }
}
