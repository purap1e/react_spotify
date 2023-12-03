import {BrowserRouter, Route, Routes} from "react-router-dom";
import './components/common/CommonStyle.css'
import React from "react";
import MainPage from "./components/pages/MainPage";
import Footer from "./components/footer/Footer";
import PlaylistPage from "./components/pages/PlaylistPage";
import { TrackProvider } from './components/TrackContext';

function App() {
  return (
      <TrackProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/playlist/:playlistId" element={<PlaylistPage/>} />
              </Routes>
              <Footer />
          </BrowserRouter>
      </TrackProvider>
  );
}

export default App;
