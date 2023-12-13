// TrackContext.js
import React, { createContext, useContext, useState } from 'react';

const TrackContext = createContext();

export const useTrackContext = () => {
    const context = useContext(TrackContext);
    if (!context) {
        throw new Error('useTrackContext must be used within a TrackProvider');
    }
    return context;
};

export const TrackProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);

    const setTrack = (track) => {
        setCurrentTrack(track);
    };

    return (
        <TrackContext.Provider value={{ currentTrack, setTrack }}>
            {children}
        </TrackContext.Provider>
    );
};
