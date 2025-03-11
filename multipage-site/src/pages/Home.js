import { Link, useNavigate } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/edit.svg";

// styles
import "./Home.css";

export default function Home() {
  const [articles, setArticles] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const ref = collection(db, "articles");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setArticles(results);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      const ref = doc(db, "articles", id);
      await deleteDoc(ref);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/edit/${id}`);
  };

  // Filter articles based on search input
  const filteredArticles = articles?.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      <h2>Articles</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search articles..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Articles List */}
      {articles ? (
        filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className="card">
              <div className="card-content">
                <h3>{article.title}</h3>
                <p className="author">Written by {article.author}</p>
                <Link className="read-more" to={`/articles/${article.id}`}>
                  Read More...
                </Link>
              </div>
              <div className="icons">
                <img
                  className="icon delete-icon"
                  onClick={() => handleDelete(article.id)}
                  src={DeleteIcon}
                  alt="delete"
                />
                <img
                  className="icon edit-icon"
                  onClick={() => handleEdit(article.id)}
                  src={EditIcon}
                  alt="edit"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No articles found.</p>
        )
      ) : (
        <p className="loading">Loading articles...</p>
      )}
    </div>
  );
}