import { Link } from 'react-router-dom'
import {getDocs, collection} from 'firebase/firestore';
import {db} from '../firebase/config';
import {useEffect, useState} from 'react';

// styles
import './Home.css'

export default function Home() {

  const [articles,setArticles] = useState(null);

  useEffect(() => {
    const ref = collection(db, 'articles');
    getDocs(ref)
      .then((snapshot) => {
        let results = [];
        snapshot.docs.forEach(doc => {  // ✅ Fix the typo here
          results.push({ id: doc.id, ...doc.data() });
        });
        setArticles(results);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error); // Optional: Handle errors
      });
  }, []);
  

  return (
    <div className="home">
      <h2>Articles</h2>      
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          {/* <p>{article.description}</p>  to test if the firebase is connected*/}
          <Link to={`/articles/${article.id}`}>Read More...</Link>
        </div>
      ))}
    </div>
  )
}
