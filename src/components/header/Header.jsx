import React from 'react'
import './HeaderStyle.css'
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {PiArrowCircleDownDuotone} from "react-icons/pi";
import {LuBell} from "react-icons/lu";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const navigate  = useNavigate();

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
                <div className="download-block">
                    <PiArrowCircleDownDuotone className="download-btn-down" size={24}/>
                    <div className="download-text">Установить приложение</div>
                </div>
                <LuBell className="bell-btn"/>
                <img className="avatar" src="/images/kitten.png" alt="kitten"/>
            </div>
        </header>
    );
}
export default Header