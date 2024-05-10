import axios from "axios";
import authHeader from './auth-header'

const API_URL = "http://localhost:9091/api/userPermission"; // Fixed port number and added a forward slash

class UserPerminssionService {
    getUserPermissions(){
        return axios.get(API_URL + '/list');
    }

    updateUserPermissions(user){
        return axios.post(API_URL + '/update',user);
    }
}

export default new UserPerminssionService();