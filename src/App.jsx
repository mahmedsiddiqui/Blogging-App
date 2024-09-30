import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import Login from './pages/Login';
import './App.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  // Check authentication status on initial render
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth) {
      setIsAuth(true);
    }
  }, []);

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to log out. Please try again later.');
    }
  };

  return (
    <Router>
      <nav>
        <Link className='nav-icon' to='/'>Home</Link>
        {!isAuth ? (
          <Link className='nav-icon' to="/login">Login</Link>
        ) : (
          <>
            <Link className='nav-icon' to="/createblog">Create Blog</Link>
            <button className='btn' onClick={signUserOut}>Log out</button>
          </>
        )}
      </nav>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createblog' element={<CreateBlog isAuth={isAuth} />} />
          <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;