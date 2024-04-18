import api from "../api/config";
import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT, SIGNUP_ENDPOINT } from "../constants/endpoints";

class AuthService {
  static instance = new AuthService();

  login(body) {
    return api.post(LOGIN_ENDPOINT, body);
  }
 
  signUp(body) {
    return api.post(SIGNUP_ENDPOINT, body);
  }

  logout() {
    return api.get(LOGOUT_ENDPOINT);
  }


}

export default AuthService.instance;
