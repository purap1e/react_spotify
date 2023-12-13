import React, {useState} from 'react'
import './HeaderStyle.css'
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {PiArrowCircleDownDuotone} from "react-icons/pi";
import {LuBell} from "react-icons/lu";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../js/AuthContext";

const Header = () => {

    const navigate  = useNavigate();
    const {isAuthenticated, logout} = useAuth();

    const goBack = () => {
        navigate(-1);
    };

    const goForward = () => {
        navigate(1);
    };

    return (
        <header className="header">
            <div className="arrow-btns">
                <div className="arrow-btn" onClick={goBack}>
                    <RxCaretLeft size={32} />
                </div>
                <div className="arrow-btn" onClick={goForward}>
                    <RxCaretRight size={32} />
                </div>
            </div>
            <div className="user-info">
                {isAuthenticated ? (
                    <>
                        <div className="download-block">
                            <PiArrowCircleDownDuotone className="download-btn-down" size={24}/>
                            <div className="download-text">Установить приложение</div>
                        </div>
                        <LuBell className="bell-btn"/>
                        <div className="dropdown">
                            <img id="avatar" className="avatar" src="/images/kitten.png" alt="kitten"/>
                                <div className="dropdown-content">
                                    <Link to="/" onClick={logout} className="logout-link">Выйти</Link>
                                </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="sign-up-btn">Зарегестрироваться</Link>
                        <Link to="/login" className="login-btn">Войти</Link>
                    </>
                )}
            </div>
        </header>
    );
}
export default Header