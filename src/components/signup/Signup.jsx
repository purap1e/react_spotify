import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import './Signup.css';
import {ReactComponent as Logo} from '../svg/spotify-ar21.svg'
const SignUp = () => {

    const AUTH_REST_API_URL_SIGNUP = 'http://localhost:8080/api/v1/auth/signup';
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async () => {
        try {
            navigate('/login')
            await fetch(AUTH_REST_API_URL_SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        } catch (error) {
            console.error('Error during user registration:', error);
        }
    };

    return (
        <div className="signup-page">
            <form className="signup-form">
                <Link to="/" className="logo">
                    <Logo/>
                </Link>
                <p>Зарегистрируйтесь и прогрузитесь в музыку</p>

                <label htmlFor="username">Электронная почта</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="name@domain.com"
                    value={formData.username}
                    onChange={handleChange}/>

                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}/>

                <button className="button-signup" onClick={handleSignUp}>
                    Далее
                </button>

                <div className="line-container">
                    <span className="line"></span>
                    или
                    <span className="line"></span>
                </div>

                <div className="btn-link">
                    <img className="icon" src="/svgs/google.svg" alt=""/>
                    <div className="text--block">Зарегистрируйтесь через Google</div>
                </div>
                <div className="btn-link">
                    <img className="icon" src="/svgs/facebook.svg" alt=""/>
                    <div className="text--block">Зарегистрируйтесь через Facebook</div>
                </div>
            </form>
        </div>
    );
}
export default SignUp;