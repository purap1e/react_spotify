import React, {useCallback, useEffect, useRef, useState} from 'react'
import '../common/CommonStyle.css'
import '../footer/FooterStyle.css'
import {useTrackContext} from "../TrackContext";
import {useAuth} from "../js/AuthContext";
import {Link} from "react-router-dom";

const Footer = () => {

    const { currentTrack } = useTrackContext();
    const {isAuthenticated, logout} = useAuth();

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    const defaultTrack = {
        imgSrc: "/images/die_for_you.jpg",
        name: "Die For You",
        artist: "The Weeknd",
        audioSrc: "/musics/dieforyou.mp3"
    };

    const trackToDisplay = currentTrack || defaultTrack;

    const togglePlayPause = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const updateProgress = () => {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateTime = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
            updateProgress();
        }
    };

    const handleProgressBarClick = (e) => {
        const progressBar = document.querySelector('.progress-area');
        const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
        const percentage = (clickPosition / progressBar.offsetWidth) * 100;
        audioRef.current.currentTime = (percentage / 100) * audioRef.current.duration;
        updateProgress();
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;

        const volumeIcon = document.querySelector('#volume');
        if (newVolume === 0) {
            volumeIcon.innerText = 'volume_off';
        } else if (newVolume < 0.5) {
            volumeIcon.innerText = 'volume_down';
        } else {
            volumeIcon.innerText = 'volume_up';
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', updateTime);
            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('timeupdate', updateTime);
                }
            };
        }
    }, [updateTime, trackToDisplay]);

    useEffect(() => {
        const loadNewTrack = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            setDuration(0);
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = '0%';
            }

            if (audioRef.current) {
                audioRef.current.src = trackToDisplay.audioSrc;

                audioRef.current.addEventListener('canplaythrough', () => {
                    if (!audioRef.current) return;

                    audioRef.current.play();
                    setIsPlaying(true);
                });
            }
        };

        loadNewTrack();

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (audioRef.current) {
                audioRef.current.removeEventListener('canplaythrough', () => {});
            }
        };
    }, [trackToDisplay]);

    const footerStyles = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        color: 'var(--white)',
        width: '100%',
        height: '100px',
        display: 'grid',
        gridTemplateColumns: isAuthenticated
            ? 'repeat(3, 1fr)'
            : '1fr',
        background: isAuthenticated
            ? '#000'
            : 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(198,40,205,1) 0%, rgba(0,212,255,1) 100%)'
    };


    return (
        <div>
            {isAuthenticated ? (
                <>
                    <footer className="footer" style={footerStyles}>
                        <div className="img-area">
                            <img src={trackToDisplay.imgSrc} alt=""/>
                            <div className="song-details">
                                <p className="name">{trackToDisplay.name}</p>
                                <p className="artist">{trackToDisplay.artist}</p>
                            </div>
                        </div>
                        <div className="music-area">
                            <div className="controls">
                                <i id="repeat-plist" className="material-icons" title="Playlist looped">repeat</i>
                                <i id="prev" className="material-icons">skip_previous</i>
                                <div className="play-pause" onClick={togglePlayPause}>
                                    <i className={`material-icons ${isPlaying ? 'pause' : 'play'}`}>
                                        {isPlaying ? 'pause' : 'play_arrow'}
                                    </i>
                                </div>
                                <i id="skip-next" className="material-icons">skip_next</i>
                                <i id="more-music" className="material-icons">queue_music</i>
                            </div>
                            <div className="progress-area" onClick={handleProgressBarClick}>
                                <div className="progress-bar">
                                    <audio ref={audioRef} id="main-audio" src={trackToDisplay.audioSrc}></audio>
                                </div>
                                <div className="song-timer">
                                    <div className="current-time">{formatTime(currentTime)}</div>
                                    <div className="max-duration">{formatTime(duration)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="extra-options">
                            <i id="slideshow" className="material-icons" title="Now Playing">slideshow</i>
                            <i id="lyrics" className="material-icons" title="Lyrics">lyrics</i>
                            <i id="queue" className="material-icons" title="Queue">queue_music</i>
                            <i id="devices" className="material-icons" title="Connect devices">devices</i>
                            <i id="volume" className="material-icons" title="Turn off">volume_up</i>
                            <div className="volume-control">
                                <input
                                    type="range"
                                    id="volumeSlider"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                />
                            </div>
                            <i id="zoom" className="material-icons" title="To full screen">open_in_full</i>
                        </div>
                    </footer>
                </>
            ) : (
                <>
                    <footer className="footer" style={footerStyles}>
                        <div className="extra-info">
                            <div className="extra-info-texts">
                                <p className="extra-title">ПРЕДВАРИТЕЛЬНЫЙ ПРОСМОТР SPOTIFY</p>
                                <p className="extra-subtitle">Зарегистрируйся, чтобы слушать музыку и подкасты без ограничений. Иногда мы будем показывать рекламу, но ты сможешь пользоваться сервисом бесплатно!</p>
                            </div>
                            <Link to="/signup" className="sign-up-btn-footer">Зарегестрироваться</Link>
                        </div>
                    </footer>
                </>
            )}
        </div>
    );
}
export default Footer