import {BrowserRouter, Route, Routes} from "react-router-dom";
import './components/common/CommonStyle.css'
import React from "react";
import MainPage from "./components/pages/MainPage";
import PlaylistPage from "./components/pages/PlaylistPage";
import {TrackProvider} from './components/TrackContext';
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import SearchPage from "./components/pages/SearchPage";
import Footer from "./components/footer/Footer";

function App() {
  return (
      <TrackProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/playlist/:playlistId" element={<PlaylistPage/>} />
                  <Route path="/signup" element={<Signup/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/search" element={<SearchPage/>} />
              </Routes>
              <Footer/>
          </BrowserRouter>
      </TrackProvider>
  );
}

export default App;
