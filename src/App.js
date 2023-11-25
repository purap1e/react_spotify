import {BrowserRouter, Route, Routes} from "react-router-dom";
import './components/common/CommonStyle.css'
import React from "react";
import MainPage from "./components/pages/MainPage";
import Footer from "./components/footer/Footer";
import PlaylistPage from "./components/pages/PlaylistPage";

function App() {
  return (
      <BrowserRouter>

          <Routes>
              <Route path="/" element={<MainPage/>}></Route>
              <Route path="/playlist/:playlistId" element={<PlaylistPage/>}></Route>
          </Routes>

          <Footer/>
      </BrowserRouter>
  );
}

export default App;
