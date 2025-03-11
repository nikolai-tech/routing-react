import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
// styles
import './create.css';

export default function EditArticle() {  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { urlId } = useParams();

  useEffect(() => {
    if (urlId) {
      const ref = doc(db, 'articles', urlId);

      getDoc(ref)
        .then((snapshot) => {
          const article = snapshot.data();
          if (article) {
            setTitle(article.title);
            setDescription(article.description);
            setAuthor(article.author);
          } else {
            navigate('/');
          }
        })
        .finally(() => setLoading(false));
    }
  }, [urlId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedArticle = { title, author, description };

    if (urlId) { 
      const ref = doc(db, 'articles', urlId);     
      await updateDoc(ref, updatedArticle);
    }  

    navigate('/');
  };

  if (loading) return <p className="loading">Loading article...</p>;

  return (
    <div className="create">
      <h2 className="page-title">Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        
        <label>
          <span>Author:</span>
          <input 
            type="text" 
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <button className="btn">Update Article</button>
      </form>
    </div>
  );
}