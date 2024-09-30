import React from 'react';
import './Login.css';
import { auth } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        // Authentication success, store the result
        localStorage.setItem('isAuth', 'true'); // Store 'true' as a string
        setIsAuth(true); // Update authentication state
        navigate('/'); // Redirect to the home page
      } else {
        throw new Error('No user data returned from Google.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      
      // Display a user-friendly error message
      let errorMessage = 'Failed to sign in. Please try again later.';
      
      // Firebase-specific error handling
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed before completing the sign-in.';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Popup request was cancelled. Please try again.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection and try again.';
      }

      alert(errorMessage);
    }
  };

  return (
    <div className="box">
      <div className="card-body-one">
        <div className="card-body-two">
          <p className='text'>Sign in with Google</p>
          <button className='btn' onClick={signInWithGoogle}>Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
