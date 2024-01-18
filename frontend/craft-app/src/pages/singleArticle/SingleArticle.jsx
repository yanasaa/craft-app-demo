import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleArticle.scss";
import { LikeTwoTone, ShareAltOutlined } from "@ant-design/icons";

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

  function getDate(date) {
    let myDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return myDate.toLocaleString("ru-RU", options);
  }

  console.log(article);
  return (
    <section className="article">
      <div className="article__wrapper">
        <h2 className="article__title">{article.title}</h2>
        <div className="article__info">
          <h3 className="article__author">{article.author_username}</h3>
          <p className="article__date">
            {article.publish && getDate(article.publish)}
          </p>
        </div>
      </div>
      <div className="article__line"></div>
      <div className="article__wrapper">
        <div className="article__img">
          <img src={article.preview} alt={article.title} />
        </div>
        {/* !!! STUDY INFORMATION ABOUT dangerouslySetInnerHTML */}
        <article className="article__text_full " dangerouslySetInnerHTML={{ __html: article.body }} ></article>
        <div className="article__feedback">
          <div className="article__likes">
            <LikeTwoTone
              twoToneColor="#eb2f96"
              className="likes__icon icon likes__icon_liked"
            />
            <span>{article.total_likes}</span>
          </div>
          <div className="article__share">
            <ShareAltOutlined
              className="share__icon"
              style={{ fontSize: "26px", color: "#ad2e95" }}
            />
            <p className="share__text">Поделиться</p>
          </div>
        </div>
      </div>
      <div className="article__line"></div>
    </section>
  );
}

export { SingleArticle };
