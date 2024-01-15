import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleArticle.scss";

function SingleArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  useEffect(() => {
    const getArticle = () => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((json) => setArticle(json));
    };
    getArticle();
  }, []);
  console.log(article);
  return (
    <section className="articlePage">
      <div className="wrapper">
        <h2>{article.title}</h2>
        <h3>{article.id}</h3>
        <p>
          {article.body} Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Tempora labore necessitatibus dolore ab officiis. Eos distinctio
          deserunt itaque, quo quia explicabo, iste culpa dolores perferendis
          reiciendis dicta velit iusto similique modi voluptas officia vel?
          Quaerat voluptatem assumenda ut, perspiciatis praesentium placeat
          veritatis excepturi hic aspernatur quod, magni, odit ex labore.
        </p>
      </div>
    </section>
  );
}

export { SingleArticle };
