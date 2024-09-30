import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom';


const CreateBlog = (isAuth) => {

  const [title, setTitle] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const postCollectionRef = collection(db, 'posts');
  const navigate = useNavigate();
  const createPost = async () => {
    if (title === "" || postTitle === "") {
      alert("fill the feilds")
      return false;
    } else {
      try {
        await addDoc(postCollectionRef, {
          title,
          postTitle,
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid
          }
        });
        navigate('/')
      } catch (error) {
        console.log(error);

      }


    }
  }

  

  return (
    <div className='container-two' >
      <div className='form-box'>
        <h1   >Create Blog</h1>
        <h4>Title:-</h4>
        <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
        <h4>Post:-</h4>
        <textarea placeholder='Post...' onChange={(e) => setPostTitle(e.target.value)}></textarea>
        <br />
        <button className='btn' onClick={createPost}  > Submit Post </button>
      </div>
    </div>
  )
}

export default CreateBlog