import axios from "axios";
import authHeader from './auth-header'

const API_URL = "http://localhost:9091/api/user"; // Fixed port number and added a forward slash

class UserService {
    getUsers(){
        return axios.get(API_URL + '/list');
    }
}

export default new UserService();