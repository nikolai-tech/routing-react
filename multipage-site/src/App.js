import './App.css';
import { BrowserRouter, Route, NavLink, Routes, Navigate } from 'react-router-dom';
import React, { useState } from 'react';

import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Article from './pages/Article';
import FormArticle from './pages/FormArticle';
import EditArticle from './pages/EditArticle';
import Login from './pages/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>My Articles</h1>
          <div className="nav-links">
            <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
            <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
            <NavLink to="/contact" className="nav-link" activeClassName="active">Contact</NavLink>
            <NavLink to="/new" className="nav-link" activeClassName="active">New Article</NavLink>
            <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/articles/:urlId" element={<Article />} />
            <Route path="/edit/:urlId" element={<EditArticle />} />
            <Route path="/new" element={<FormArticle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;