import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatarDefault from "../../components/shared/assets/img/ui/avatar.svg";
import {
  AuditOutlined,
  FileTextOutlined,
  SmileOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./Profile.scss";
import Button from "../../components/shared/ui/button/Button";

import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import UserArticleCard from "./ui/userArticleCard/UserArticleCard";
import { ROUTE_NAMES } from "../../routes/routeNames";
import { profileSelector } from "./selectors";
import { currentProfileThunk } from "./thunks";
import { ArticlesGallery } from "../../components/ArticlesGallery/ArticlesGallery";
import { useArticles } from "../../hooks/useArticles";

export const Profile = () => {
  const dispatch = useDispatch()
  const {errors, isLoading , currentUser} = useSelector(profileSelector);
  const { articlesQuantity } = useArticles()


  let navigate = useNavigate();
  function handleClick() {
    navigate(ROUTE_NAMES.ARTICLE_CREATE);
    window.scrollTo(0, 0);
  }

  const [userArticles, setUserArticles] = useState([]);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);


  useEffect(() => {
    dispatch(currentProfileThunk())
  },[dispatch])
 

  useEffect(() => {
    const getUserArticles = () => {
      fetch(
        `http://84.201.140.115/api/v1/posts/?username=${currentUser.slug}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          setUserArticles(json.reverse());
          setTotal(json.length);
        });
    };
    getUserArticles();
  }, [currentUser, total]);

  const indexOfFirstPage = page * postsPerPage - postsPerPage;
  const indexOfLastPage = indexOfFirstPage + postsPerPage;
  const currentPosts = userArticles.slice(indexOfFirstPage, indexOfLastPage);
  const displayArticles = currentPosts.map((article) => {
    return (
      <UserArticleCard
        className="article-preview"
        key={article.id}
        title={article.title}
        body={article.post_preview}
        slug={article.slug}
        id={article.id}
        likes={article.total_likes}
        author={article.author_username}
        imgSrc={article.preview}
        publish={article.publish}
        setTotal={setTotal}
      />
    );
  });

  const changePage = (value) => {
    setPage(value);
  };
  const onShowSizeChange = (curent, pageSize) => {
    setPostsPerPage(pageSize);
  };

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <div className="wrapper">
          <div className="profile__info">
            <EditOutlined
              className="icon__edit-profile"
              title="редактировать профиль"
              onClick={() => {
                navigate(ROUTE_NAMES.PROFILE_EDIT);
                window.scrollTo(0, 0);
              }}
            />
            <div className="profile__user-card">
              <div className="user-card__img">
                <img
                  src={
                    (!currentUser.avatar.endsWith('default.png'))
                      ? `http://84.201.140.115${currentUser.avatar}` : 
                      avatarDefault
                  }
                  alt="user"
                />
              </div>
              <div className="user-card__info">
                <div className="user-card__item">
                  <div className="item__number">
                    <h3>0</h3>
                    <SmileOutlined />
                  </div>
                  <p className="item__text">подписчиков</p>
                </div>
                <div className="user-card__item">
                  <div className="item__number">
                    <h3>0</h3>
                    <AuditOutlined />
                  </div>
                  <p className="item__text">подписок</p>
                </div>
                <div className="user-card__item">
                  <div className="item__number">
                    <h3>{articlesQuantity}</h3>
                    <FileTextOutlined />
                  </div>
                  <p className="item__text">статей</p>
                </div>
                <Button
                  className="button button_colored user-card_btn"
                  onClick={() => {
                    navigate(ROUTE_NAMES.ARTICLE_CREATE);
                    window.scrollTo(0, 0)
                  }}
                >
                  Добавить статью
                </Button>
              </div>
            </div>
            <div className="user-info">
              <h3>Имя</h3>
              <h2 className="user-info__name">{currentUser.first_name}</h2>
              <h3>Фамилия</h3>
              <h2 className="user-info__name">{currentUser.last_name}</h2>
              <h3>Email</h3>
              <h3>{currentUser.email}</h3>
              <h3>Логин</h3>
              <h3>{currentUser.username}</h3>
              <h3>Пол</h3>
              <h3>{currentUser.gender === "F" ? "Ж" : "М"}</h3>
              <h3>О себе</h3>
              <p className="story__text">{currentUser.bio}</p>
            </div>
          </div>
        </div>
        <h2>Мои статьи</h2>
        <div className="profile__articles">
          <div className="wrapper">
            <div className="article-gallery">{displayArticles}</div>
          </div>
        </div>
        <ArticlesGallery searchValue={`?username=${currentUser.slug}`}/>
      </div>

      <div className="pagination">
        <Pagination
          onChange={changePage}
          total={total}
          pageSize={postsPerPage}
          current={page}
          showSizeChanger={false}
          showQuickJumper
          locale={{ jump_to: "Перейти на", page: "стр" }}
          onShowSizeChange={onShowSizeChange}
          hideOnSinglePage
        ></Pagination>
      </div>
    </section>
  );
};
