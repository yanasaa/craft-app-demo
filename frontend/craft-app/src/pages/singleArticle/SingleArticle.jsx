import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleArticle.scss";

function SingleArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  useEffect(() => {
    const getArticle = () => {
      fetch(`http://84.38.183.195/api/v1/post/${slug}`)
        .then((response) => response.json())
        .then((json) => setArticle(json));
    };
    getArticle();
  }, [slug]);
 
  return (
    <section className="articlePage">
      <div className="wrapper">
        <h2>{article.title}</h2>
        <h3>{article.id}</h3>
        <h3>{article.author_full_name}</h3>
        <p>{article.body}</p>
      </div>
    </section>
  );
}

export { SingleArticle };
