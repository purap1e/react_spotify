import React, {useEffect, useState} from 'react'
import '../home/HomeStyle.css'
import '../common/CommonStyle.css'
import Header from "../header/Header";
import Content from "../main-content/Content";


const Home = () => {
    const [title, setTitle] = useState("Добрый вечер");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hour = now.getHours();

            if (hour < 18) {
                setTitle("Добрый день")
            } else {
                setTitle("Добрый вечер")
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className="main">
            <div className="container">
                <Header/>
                <div className="first-section">
                    <p className="title">{title}</p>
                    <Content/>
                </div>
            </div>
        </div>
    );
}
export default Home