import api from "../api/config";
import { MY_PROFILE_ENDPOINT, USERS_PROFILE_ENDPOINT, USER_PROFILE_ENDPOINT } from "../constants/endpoints";

class ProfileService {
  static instance = new ProfileService();

  getUserProfile(userId) {
    return api.get(`${USER_PROFILE_ENDPOINT}${userId}/`);
  }
  
  getAllUsersProfiles() {
    return api.get(USERS_PROFILE_ENDPOINT);
  
  }
  getCurrentProfile() {
    return api.get(MY_PROFILE_ENDPOINT);
  }

  updateCurrentProfile(userId, userData) {
    return api.patch(`${USER_PROFILE_ENDPOINT}${userId}/`, userData);
  }

  subscribeUser(userId) {
    return api.post(`${USER_PROFILE_ENDPOINT}${userId}/subscribe/`);
  }

}

export default ProfileService.instance;