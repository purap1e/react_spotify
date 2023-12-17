import React, {useEffect, useState} from 'react'
import './HeaderStyle.css'
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {PiArrowCircleDownDuotone} from "react-icons/pi";
import {LuBell} from "react-icons/lu";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../js/AuthContext";
import songs from '../data/Songs';

const Header = ({showSearchInput}) => {

    const navigate = useNavigate();
    const {isAuthenticated, logout} = useAuth();
    const [searchMode, setSearchMode] = useState(false);
    const [foundTracks, setFoundTracks] = useState([]);
    const [query, setQuery] = useState('')

    const goBack = () => {
        navigate(-1);
    };

    // const SearchInput = ({value, onChange}) => {
    //     return (
    //         <input className="search-input" value={value} onChange={(e) => onChange(e.target.value)}>
    //
    //         </input>
    //     )
    // }
    //
    // const handleChange = (value) => {
    //     setQuery(value)
    //     setFoundTracks(songs.filter(song => song.name.toLowerCase().startsWith(query.toLowerCase())))
    // }
    //
    // useEffect(() => {
    //     setFoundTracks(songs.filter(song => song.name.toLowerCase().startsWith(query.toLowerCase())))
    // }, [songs, query])

    const goForward = () => {
        navigate(1);
    };

    useEffect(() => {
        if (showSearchInput) {
            setSearchMode(true);
        }
    }, [showSearchInput]);

    return (
        <header className="header">
            <div className="arrow-btns">
                <div className="arrow-btn" onClick={goBack}>
                    <RxCaretLeft size={32}/>
                </div>
                <div className="arrow-btn" onClick={goForward}>
                    <RxCaretRight size={32}/>
                </div>

                {/*{showSearchInput ? (*/}
                {/*    <>*/}
                {/*        <SearchInput value={query} onChange={(value) => handleChange(value)}/>*/}
                {/*        {foundTracks ? foundTracks.map((track, index) => {*/}
                {/*                console.log(foundTracks)*/}
                {/*            }*/}
                {/*        ) : <div>Nothing found</div>}*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <>*/}
                {/*    </>*/}
                {/*)}*/}
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