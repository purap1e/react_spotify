import React, {useEffect, useRef, useState} from 'react'
import '../common/CommonStyle.css'
import '../footer/FooterStyle.css'

const Footer = () => {

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

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

    const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
        updateProgress();
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
        audioRef.current.addEventListener('timeupdate', updateTime);
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            audioRef.current.removeEventListener('timeupdate', updateTime);
        };
    }, []);

    return (
        <footer className="footer">
            <div className="img-area">
                <img src="/images/die_for_you.jpg" alt=""/>
                <div className="song-details">
                    <p className="name">Die For You</p>
                    <p className="artist">The Weeknd</p>
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
                        <audio ref={audioRef} id="main-audio" src="/musics/dieforyou.mp3"></audio>
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
    );
}

export default Footer