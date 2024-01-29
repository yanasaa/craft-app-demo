import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { LikeFilled, LikeTwoTone, ShareAltOutlined } from "@ant-design/icons";
import "./SingleArticle.scss";

const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

function SingleArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  const [like, setLike] = useState([]);
  const [id, setId] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState("");

  useEffect(() => {
    const getArticle = () => {
      fetch(`http://84.38.183.195/api/v1/post/${slug}`)
        .then((response) => response.json())
        .then((json) => {
          setArticle(json);
          setLike(json.likes);
          setId(json.id);
        });
    };
    getArticle();
  }, [slug, isLiked]);

  function getDate(date) {
    let myDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return myDate.toLocaleString("ru-RU", options);
  }

  //TODO ПЕРЕПИСАТЬ ФУНКЦИЮ ПОСТАВИТЬ ЛАЙК, КОГДА БУДЕТ ГОТОВА АВТОРИЗАЦИЯ /

  function onLikeButtonClick() {
    const res = fetch(`http://84.38.183.195/api/v1/like/unlike/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .catch((error) => {
        setError(error.detail);
      });
    setIsLiked(!isLiked);
    console.log(like);
    return res;
  }

  const copyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Ссылка на статью скопирована в буфер обмена",
    });
  };
  console.log(error, "myMessage");
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
        <article
          className="article__text_full "
          dangerouslySetInnerHTML={{ __html: article.body }}
        ></article>
        <div className="article__feedback">
          <div className="article__likes">
            {isLiked ? (
              <LikeFilled
                className="likes__icon icon likes__icon_liked"
                style={{ color: "#ad2e95" }}
                onClick={onLikeButtonClick}
              />
            ) : (
              <LikeTwoTone
                twoToneColor="#eb2f96"
                className="likes__icon icon likes__icon_liked"
                onClick={onLikeButtonClick}
              />
            )}
            <span>{article.total_likes}</span>
          </div>
          <div
            className="article__share"
            onClick={() => {
              success();
              copyLink();
            }}
          >
            {contextHolder}
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
