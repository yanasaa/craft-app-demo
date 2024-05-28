import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { LikeFilled, LikeTwoTone, ShareAltOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import "./SingleArticle.scss";
import { Link } from "react-router-dom";
import { ROUTE_NAMES } from "../../routes/routeNames";

import { loginSelector } from "../signIn/selectors";
import { setArticleLikeThunk, singleArticleThunk } from "./thunks";
import { acticleSelector } from "./selectors";
import { profileSelector } from "../profile/selectors";



const ACCESS_TOKEN = localStorage.getItem("token");

export const SingleArticle = () => {
  const { isAuth } = useSelector(loginSelector);
  const { article } = useSelector(acticleSelector);
  const { currentUser } = useSelector(profileSelector);

  const { slug } = useParams();
  const [like, setLike] = useState([]);
  const [id, setId] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(singleArticleThunk(slug))
  }, [article.is_liked, article.is_favorited]);

  function getDate(date) {
    let myDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return myDate.toLocaleString("ru-RU", options);
  }

  function onLikeButtonClick() {
    if(!isAuth) {
      alert("Перейти на страницу входа?")
    }
    dispatch(setArticleLikeThunk(article.id))
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

const handleAddFavourite = async () => {
  const res = await fetch(`http://84.201.140.115/api/v1/post/${article.id}/favorite/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(),
    })
      .then((response) => console.log(response.json()))
      .catch((error) => {
        console.log(error);
      });
  
    return res;
}

  console.log(article)
  console.log(currentUser)
  return (
    <section className="article">
      <div className="article__wrapper">
        <h2 className="article__title">{article.title}</h2>
        <div className="article__info">
          <Link className="article__author" to={`${ROUTE_NAMES.PROFILE_AUTHOR}${article.author}`}>
            {article.author_username}
          </Link>
          <p className="article__date">
            {article.publish && getDate(article.publish)}
          </p>
        </div>
      </div>
      <div className="article__line"></div>
      <div className="article__wrapper">
        {/* <div className="article__img">
          <img src={article.preview} alt={article.title} />
        </div> */}
        <article
          className="article__text_full "
          dangerouslySetInnerHTML={{ __html: article.body }}
        ></article>
        <div className="article__feedback">
          <div className="article__likes">
            {article.likes.includes(currentUser.id) ? (
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
              <div className="article__actions">
              <span
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
            <span className="share__text">Поделиться</span>
          </span>
          {isAuth &&  <span className="article__favourite" onClick={handleAddFavourite}
          >
            {article.is_favorited ? 
                <StarFilled className="favourite__icon" style={{ fontSize: "26px", color: "#ad2e95" }}
             
              /> : <StarOutlined className="favourite__icon" style={{ fontSize: "26px", color: "#ad2e95" }}

            />}
            <span className="share__text">Добавить статью в избранное</span>
          </span>}
              </div>
        </div>
      </div>
      <div className="article__line"></div>
    </section>
  );
};
