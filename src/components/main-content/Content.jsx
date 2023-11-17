import React, { useState } from 'react'
import '../common/CommonStyle.css'
import '../main-content/ContentStyle.css'
const Content = () => {

    const [playlists, setPlaylists] = useState([
        {
            id: 1,
            imgSrc: '/images/photo_5211160988370454928_m.jpg',
            name: 'Микс понравившихся'
        },
        {
            id: 2,
            imgSrc: '/images/photo_5211160988370454929_m.jpg',
            name: 'staring at the ceiling at 3am'
        },
        {
            id: 3,
            imgSrc: '/images/photo_5211160988370454930_m.jpg',
            name: 'The Weeknd: микс'
        },
        {
            id: 4,
            imgSrc: '/images/photo_5211160988370454966_m.jpg',
            name: 'BALLADS 1'
        },
        {
            id: 5,
            imgSrc: '/images/photo_5211160988370454967_m.jpg',
            name: 'NFS Most Wanted Soundtrack List'
        },
        {
            id: 6,
            imgSrc: '/images/photo_5211160988370454968_m.jpg',
            name: 'chill lofi focus beats'
        }
    ]);

    const [recommendations, setRecommendations] = useState([
        {
            id: 1,
            name: 'Только для тебя, purap1e',
            mixes: [
                {
                    id: 1,
                    imgSrc: '/images/photo_5215335992934912235_m.jpg',
                    title: 'Радар новинок',
                    subtitle: 'Свежая музыка от любимых исполнителей и новые треки специально для тебя. Обновляется каждую пятницу.'
                },
                {
                    id: 2,
                    imgSrc: '/images/photo_5215335992934912240_m.jpg',
                    title: 'Микс дня #1',
                    subtitle: 'Bruno Mars, Mac Miller, Doja Cat и не только'
                },
                {
                    id: 3,
                    imgSrc: '/images/photo_5211160988370454973_m.jpg',
                    title: 'Микс дня #2',
                    subtitle: 'Joji, Billie Eilish, Twenty One Pilots и не только'
                },
                {
                    id: 4,
                    imgSrc: '/images/die_for_you.jpg',
                    title: 'Микс дня #3',
                    subtitle: 'd4vd, AJR, TV Girl и не только'
                },
                {
                    id: 5,
                    imgSrc: '/images/photo_5211160988370454930_m.jpg',
                    title: 'Микс дня #4',
                    subtitle: 'The Weeknd, KennyHoopla, Jesse® и не только'
                },
                {
                    id: 6,
                    imgSrc: '/images/photo_5215335992934912239_m.jpg',
                    title: 'Микс дня #5',
                    subtitle: 'Chase Atlantic, Big Time Rush, Camila Cabello и не только'
                }
            ]
        },
        {
            id: 2,
            name: 'Твои лучшие миксы',
            mixes: [
                {
                    id: 1,
                    imgSrc: '/images/photo_5384230333400075853_m.jpg',
                    title: 'Микс для релакса',
                    subtitle: 'Kali Uchis, Post Malone, Mac Miller и не только'
                },
                {
                    id: 2,
                    imgSrc: '/images/photo_5384230333400075854_m.jpg',
                    title: 'Микс позитивной музыки',
                    subtitle: 'OneRepublic, WILLOW, Katy Perry и не только'
                },
                {
                    id: 3,
                    imgSrc: '/images/photo_5384230333400075855_m.jpg',
                    title: 'Микс музыки 2000-х',
                    subtitle: 'Kanye West, Maroon 5, Nelly Furtado и не только'
                },
                {
                    id: 4,
                    imgSrc: '/images/photo_5384230333400075858_m.jpg',
                    title: 'Bruno Mars: микс',
                    subtitle: 'The Weeknd, DNCE и Naughty Boy'
                },
                {
                    id: 5,
                    imgSrc: '/images/photo_5384230333400075859_m.jpg',
                    title: 'Микс рок-музыки',
                    subtitle: 'Linkin Park, Nirvana, Los Abuelos De La Nada и не только'
                },
                {
                    id: 6,
                    imgSrc: '/images/photo_5384230333400075860_m.jpg',
                    title: 'Микс инди-музыки',
                    subtitle: 'Cage The Elephant, alt-J, Tame Impala и не только'
                },
                {
                    id: 7,
                    imgSrc: '/images/photo_5384230333400075874_m.jpg',
                    title: 'Микс хип-хопа',
                    subtitle: 'JAY-Z, Eminem, Connor Price и не только'
                }
            ]
        },
        {
            id: 3,
            name: 'Недавно прослушано',
            mixes: [
                {
                    id: 1,
                    imgSrc: '/images/photo_5211160988370454930_m.jpg',
                    title: 'Микс R&B',
                    subtitle: 'The Weeknd, Masego, Justin Park и не только'
                },
                {
                    id: 2,
                    imgSrc: '/images/photo_5211160988370454967_m.jpg',
                    title: 'NFS Most Wanted Soundtrack List',
                    subtitle: 'Perceptionists - Let\'s Move, Brian Transeau - Tao Of The Machine has missing from Spotify.'
                },
                {
                    id: 3,
                    imgSrc: '/images/likes.jpg',
                    title: 'Любимые треки',
                    subtitle: '695 треков'
                },
                {
                    id: 4,
                    imgSrc: '/images/photo_5384230333400075860_m.jpg',
                    title: 'Микс инди-музыки',
                    subtitle: 'Cage The Elephant, alt-J, Tame Impala и не только'
                },
                {
                    id: 5,
                    imgSrc: '/images/photo_5211160988370454928_m.jpg',
                    title: 'Микс понравившихся',
                    subtitle: 'Linkin Park, Nirvana, Los Abuelos De La Nada и не только'
                },
                {
                    id: 6,
                    imgSrc: '/images/photo_5384230333400075887_m.jpg',
                    title: '9mm Memphis Cult, Groove Dealers & SPLYXER Watch my 9mm goes bang Wanna bang, wanna, bang Watch',
                    subtitle: 'Watch my 9mm goes bang Wanna bang, wanna, bang Watch my 9mm goes bang Wanna bang, wananana, bang'
                },
                {
                    id: 7,
                    imgSrc: '/images/photo_5384230333400075888_m.jpg',
                    title: 'BRAZILIAN PHONK',
                    subtitle: 'BRASIL FUNK meets EDM PHONK MUSIC. BRAZILIAN PHONK Contact: @tribaltrap'
                },
                {
                    id: 8,
                    imgSrc: '/images/photo_5384230333400075889_m.jpg',
                    title: 'Микс грустных песен',
                    subtitle: 'purap1e'
                },
                {
                    id: 9,
                    imgSrc: '/images/photo_5384230333400075890_m.jpg',
                    title: 'sweater weather vibes',
                    subtitle: ''
                }
            ]
        }
    ])

    return (
       <div>
           <div className="user-playlists">
               {playlists.map((playlist) => (
                   <div className="playlist" key={playlist.id}>
                       <img src={playlist.imgSrc} alt={playlist.name} />
                       <div className="text-area">
                           <p>{playlist.name}</p>
                           <div className="play-pause-item">
                               <i className="material-icons">play_arrow</i>
                           </div>
                       </div>
                   </div>
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