export class AuthService {

  // private isAuthontificated: boolean;

  login() {

    // this.isAuthontificated = true;
    window.localStorage.setItem('isLogged', 'true');

  }

  logout() {

    // this.isAuthontificated = false;
    window.localStorage.clear();

  }

  isLoggedIn() {

    return window.localStorage.getItem('isLogged');

  }

}
