import axios from "axios";
import authHeader from './auth-header'

const API_URL ="http://localhost/9091/api/test";

class UserService {
    getPublicContent(){
        return axios.get(API_URL + 'all');
    }
}

export default new UserService();