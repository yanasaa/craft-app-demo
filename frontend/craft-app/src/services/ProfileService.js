import api from "../api/config";
import { MY_PROFILE_ENDPOINT, USER_PROFILE_ENDPOINT } from "../constants/endpoints";

class ProfileService {
  static instance = new ProfileService();

  getUserProfile(userId) {
    return api.get(`${USER_PROFILE_ENDPOINT}${userId}/`);
  }
 
  getCurrentProfile() {
    return api.get(MY_PROFILE_ENDPOINT);
  }

  updateCurrentProfile(userId, userData) {
    return api.patch(`${USER_PROFILE_ENDPOINT}${userId}/`, userData);
  }

}

export default ProfileService.instance;