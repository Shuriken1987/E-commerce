import axios from "axios";

class AuthService {
    static login(body) {
        return axios.post("/api/user/login", body);
    }

    static register(body) {
        return axios.post("/api/user/register", body);
    }

    static completeRegistration(body) {
        return axios.post("/api/user/complete-registration", body);
    }

    static userUpdate(body) {
        return axios.put("/api/user/profile", body);
    }

    static isUserLoggedIn() {
        return localStorage.hasOwnProperty('user');
    }

    static getAllUsers() {
        return axios.get("/api/user/get-all-users");
    }

    static deleteUserById(id) {
        return axios.delete(`/api/user/delete${id}`)
    }
}

export default AuthService;