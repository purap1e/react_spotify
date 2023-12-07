import axios from "axios";
import LocalStorageService, {ACCESS_TOKEN_KEY, USER_INFO_KEY} from "./LocalStorageService";

const AUTH_REST_API_URL_LOGIN = 'http://localhost:8080/api/v1/auth/login';

class AuthService {

    static login(data) {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);

        return axios.post(AUTH_REST_API_URL_LOGIN, formData)
            .then(res => {
                LocalStorageService.save(ACCESS_TOKEN_KEY, res.headers.get("access_token"));
                LocalStorageService.save(USER_INFO_KEY, JSON.stringify(res.data.user));
            })
    }

    static logout() {
        LocalStorageService.clear("user");
    }
}

export default AuthService;
