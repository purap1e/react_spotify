import React, {useEffect, useState} from 'react'
import LocalStorageService, {USER_INFO_KEY} from "../service/LocalStorageService";
import {useTrackContext} from "../TrackContext";
import axios from "axios";
import {CiHeart} from "react-icons/ci";
import {FaHeart} from "react-icons/fa";
import {IoMdTime} from "react-icons/io";
import SearchInput from "../header/SearchInput";
import './Search.css';
import Header from "../header/Header";

const Search = () => {

    const [thisPlaylistSongs, setThisPlaylistSongs] = useState([]);
    const [user] = useState(JSON.parse(LocalStorageService.get(USER_INFO_KEY)));
    const {setTrack} = useTrackContext();
    const [tableRows, setTableRows] = useState([]);
    const [query, setQuery] = useState('')

    const addSongToUser = (songId) => {
        axios.post(`http://localhost:8080/api/v1/users/add-song?userId=${user.id}&songId=${songId}`)
            .then(r => console.log(r));

        const updatedPlaylistSongs = thisPlaylistSongs.map(song =>
            songId === song.id ? {...song, test: 1} : song)

        setThisPlaylistSongs(updatedPlaylistSongs);
    }

    const removeSongFromUser = (songId) => {
        axios.delete(`http://localhost:8080/api/v1/users?userId=${user.id}&songId=${songId}`)
            .then(r => console.log(r))

        const updatedPlaylistSongs = thisPlaylistSongs.map(song =>
            songId === song.id ? {...song, test: 0} : song)

        setThisPlaylistSongs(updatedPlaylistSongs);
    }

    const AudioDuration = ({ audioSrc }) => {
        const [duration, setDuration] = useState(null);

        useEffect(() => {
            const audio = new Audio(audioSrc);

            const handleLoadedMetadata = () => {
                setDuration(audio.duration);
            };

            audio.addEventListener('loadedmetadata', handleLoadedMetadata);

            return () => {
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }, [audioSrc]);

        const formatDuration = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        };

        return <span>{duration ? formatDuration(duration) : 'Loading...'}</span>;
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/songs/search?name=${query}`)
            .then(response => {
                setThisPlaylistSongs(response.data);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });
    }, [query]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/songs`)
            .then(response => {
                setThisPlaylistSongs(response.data);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });
    }, []);

    useEffect(() => {
        const updateTableRows = async () => {

            const rows = await Promise.all(
                thisPlaylistSongs.map((song, index) => {
                    console.log(song.id);
                    try {
                        const updatedTimeDate = new Date(song.updatedTime);
                        const formattedUpdatedTime = updatedTimeDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        });
                        return (
                            <tr key={index} onClick={() => setTrack(song)}>
                                <td className="song-text">{index + 1}</td>
                                <td>
                                    <div className="img-name">
                                        <img src={song.image} alt={''}/>
                                        <div>
                                            <p>{song.name}</p>
                                            <p className="song-text">{song.artist}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="song-text">{song.album}</td>
                                <td className="song-text">{formattedUpdatedTime}</td>
                                <td className="song-text">
                                    {song.test === 0 ? (
                                        <>
                                            <div className="btn-like" onClick={(e) => { e.stopPropagation(); addSongToUser(song.id); }}>
                                                <CiHeart/>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="btn-dislike" onClick={(e) => { e.stopPropagation(); removeSongFromUser(song.id); }}>
                                                <FaHeart/>
                                            </div>
                                        </>
                                    )}
                                </td>
                                <td className="song-text">
                                    <AudioDuration audioSrc={song.audio} />
                                </td>
                            </tr>
                        );
                    } catch (error) {
                        console.error('Error loading audio duration', error);
                        return null;
                    }
                })
            );
            setTableRows(rows.filter(row => row !== null));
        };
        updateTableRows().then();
    }, [thisPlaylistSongs, query]);

    const handleChange = (value) => {
        setQuery(value)
    }

    return (
        <div className="main-details">
            <div className="container">
                <Header/>
                <SearchInput value={query} onChange={(value) => handleChange(value)}/>

                <div className="songs">
                    <div className="song-table">
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Название</th>
                                <th>Альбом</th>
                                <th>Дата обновления</th>
                                <th> </th>
                                <th>
                                    <div className="sont-duration-icon">
                                        <IoMdTime/>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colSpan="6">
                                    <hr/>
                                </td>
                            </tr>
                            {tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Search