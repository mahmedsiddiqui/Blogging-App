import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Home = () => {
  const [postLists, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const postsCollectionRef = collection(db, 'posts');

  const getPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDocs(postsCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPostList(posts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const postDoc = doc(db, 'posts', id);
        await deleteDoc(postDoc);
        getPosts(); // Refresh the post list after deletion
      } catch (error) {
        console.error("Error deleting post: ", error);
        setError("Failed to delete post. Please try again.");
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="homepage">
      {postLists.length === 0 ? (
        <div>
          <h3>No posts added</h3>
          <img 
            style={{ marginLeft: "520px" }} 
            src="data:image/jpeg;base64,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" 
            alt="No posts" 
          />
        </div>
      ) : (
        postLists.map((post) => (
          <div key={post.id} className="blog-box" style={{ marginBottom: '4px', boxShadow: '1px 2px 9px #ffffff' }}>
            <h3 className="post-title">{post.title}</h3>
            <button className="btn delete-button" onClick={() => deletePost(post.id)}>Delete</button>
            <p>{post.postTitle}</p>
            <span>By: {post.author.name}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;