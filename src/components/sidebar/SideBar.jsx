import React, { useState, useEffect } from 'react'
import '../sidebar/SideBarStyle.css'
import '../common/CommonStyle.css'

const SideBar = () => {
    const [imageSrcArray, setImageSrcArray] = useState([]);
    useEffect(() => {
        const imageSources = [
            '/images/likes.jpg',
            '/images/photo_5211160988370454928_m.jpg',
            '/images/photo_5211160988370454929_m.jpg',
            '/images/photo_5211160988370454930_m.jpg',
            '/images/photo_5211160988370454966_m.jpg',
            '/images/photo_5211160988370454967_m.jpg',
            '/images/photo_5211160988370454968_m.jpg',
            '/images/photo_5211160988370454969_m.jpg',
            '/images/photo_5211160988370454973_m.jpg',
            '/images/photo_5211160988370454977_m.jpg',
            '/images/photo_5215335992934912235_m.jpg',
            '/images/photo_5215335992934912236_m.jpg',
            '/images/photo_5215335992934912237_m.jpg',
            '/images/photo_5215335992934912239_m.jpg',
            '/images/photo_5215335992934912240_m.jpg'
        ];
        setImageSrcArray(imageSources);
    }, []);

    return (
        <div className="sidebar">
            <div className="home">
                <div className="home-icons">
                    <i className="material-icons">home</i>
                    <i className="material-icons">search</i>

                </div>
            </div>
            <div className="media-library">
                <div className="media-library-icons">
                    <i className="material-icons">library_music</i>
                </div>
                <div className="list-of-playlist">
                    {imageSrcArray.map((src, index) => (
                        <div className="item-list" key={index}>
                            <img src={src} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default SideBar