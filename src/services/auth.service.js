import axios from 'axios';
const API_URL = "http://localhost:9091/api/user"; // Fixed port number and added a forward slash

class AuthService {
    async login(username, password) {
        return axios
            .post(API_URL + "/login", { // Added a forward slash before "login"
                username,
                password
            })
            .then(response => {
                var tokenResponse = response.data;
                var tokenAccess = tokenResponse.replace('Bearer ','');
                if (tokenAccess) {
                    localStorage.setItem("user", JSON.stringify(tokenAccess));
                }
                return tokenResponse;
            });
    }

    async getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default AuthService;
