import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as Logo} from '../svg/spotify-ar21.svg'
import LocalStorageService from "../service/LocalStorageService";
import AuthService from "../service/AuthService";
import {useAuth} from "../js/AuthContext";
import './Login.css';
const Login = () => {

    const {login} = useAuth();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const data = {username, password};
        AuthService.login(data).then(res => {
            console.log(LocalStorageService.get("access_token"));
        });
        login();
        navigate("/");
    }

    return (
        <div className="login-page">
            <form className="login-form">
                <Link to="/" className="logo">
                    <Logo/>
                </Link>
                <div className="login-container">
                    <p>Войти в Spotify</p>

                    <div className="btn-link-login">
                        <img className="icon" src="/svgs/google.svg" alt=""/>
                        <div className="text--block">Войти через Google</div>
                    </div>
                    <div className="btn-link-login">
                        <img className="icon" src="/svgs/facebook.svg" alt=""/>
                        <div className="text--block">Войти через Facebook</div>
                    </div>

                    <hr/>

                    <label htmlFor="username">Электронная почта или имя пользователя</label>
                    <input
                        className="login-input"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Электронная почта или имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor="password">Пароль</label>
                    <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>


                    <button className="button-signup" onClick={(e) => handleSubmit(e)}>
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
}
export default Login;