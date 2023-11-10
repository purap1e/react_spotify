import React, {useEffect, useState} from 'react'
import '../home/HomeStyle.css'
import '../common/CommonStyle.css'

const Home = () => {
    const [time, setTime] = useState("Добрый вечер");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hour = now.getHours();

            if (hour < 18) {
                setTime("Добрый день")
            } else {
                setTime("Добрый вечер")
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className="main">
            <div className="container">
                <header className="header">
                    <img src="/svgs/arrow-right.svg"/>
                </header>
                <div className="first-section">
                    <p className="title">{time}</p>
                </div>
            </div>
        </div>
    );
}
export default Home