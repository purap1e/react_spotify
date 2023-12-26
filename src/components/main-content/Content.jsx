import React, {useEffect, useState} from 'react'
import recommendations from '../data/Recommendations'
import '../common/CommonStyle.css'
import '../main-content/ContentStyle.css'
import {Link} from "react-router-dom";
import axios from "axios";

const Content = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/playlists')
            .then(response => {
                setPlaylists(response.data);
            })
            .catch(error => {
                console.error('Error fetching playlists:', error);
            });
    }, []);

    return (
       <div>
           <div className="user-playlists">
               {playlists.map((playlist) => (
                   <Link to={`/playlist/${playlist.id}`} className="link">
                   <div className="playlist" key={playlist.id}>
                       <img src={playlist.image} alt={playlist.name} />
                       <div className="text-area">
                           <p>{playlist.name}</p>
                           <div className="play-pause-item">
                               <i className="material-icons">play_arrow</i>
                           </div>
                       </div>
                   </div>
                   </Link>
               ))}
           </div>
           <div className="recommendations">
               {recommendations.map((recommendation) => (
                   <div key={recommendation.id} className="mix-item">
                       <div className="mix-item-header">
                           <p className="mix-item-title">{recommendation.name}</p>
                           <a id="showAllButton" href="#">
                               Показать все
                           </a>
                       </div>
                       <div className="item-cards">
                           {recommendation.mixes.map((mix) => (
                               <div key={mix.id} className="mix-item-card">
                                   <div className="card-info">
                                       <img src={mix.imgSrc} alt={mix.title} />
                                       <p className="card-title">{mix.title}</p>
                                       <p className="cart-subtitle">{mix.subtitle}</p>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
               ))}
           </div>
       </div>
    );
}
export default Content