import React from 'react'
import './HeaderStyle.css'
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {PiArrowCircleDownDuotone} from "react-icons/pi";
import {LuBell} from "react-icons/lu";

const Header = () => {
    return (
        <header className="header">
            <div className="arrow-btns">
                <RxCaretLeft className="arrow-btn" size={32}/>
                <RxCaretRight className="arrow-btn" size={32}/>
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