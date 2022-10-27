import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavigationBar from './components/Navbar';

import Music from './views/music-view/music.js'
import Login from './views/login-view/login.js'
import Signup from './views/signup-view/signup.js'
import Favorite from './views/favorites-view/favorites.js'
import Homescreen from './home.js'

export default function App() {
    return (
        <BrowserRouter>
        <NavigationBar />
          <Routes>
            <Route exact path="/music" element={<Music />}></Route>
            <Route exact path="/newLogin" element={<Login />}></Route>
            <Route exact path="/newSignup" element={<Signup />}></Route>
            <Route exact path="/favorites" element={<Favorite />}></Route>
            <Route exact path="/" element={<Homescreen />}></Route>
          </Routes>
        </BrowserRouter>
    );
};
