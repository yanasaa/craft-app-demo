import { useEffect, useState } from "react";
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
import { ROUTES } from "../../components/shared/consts/routes";
import UserArticleCard from "./ui/userArticleCard/UserArticleCard";

const Profile = () => {
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  let navigate = useNavigate();
  function handleClick() {
    navigate(ROUTES.CREATE);
    window.scrollTo(0, 0);
  }

  const [userProfile, setUserProfile] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  useEffect(() => {
    const getUserProfile = () => {
      fetch(`http://84.38.183.195/api/v1/userprofile/me/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setUserProfile(json);
        });
    };
    getUserProfile();
  }, []);

  useEffect(() => {
    const getUserArticles = () => {
      fetch(`http://84.38.183.195/api/v1/posts/?username=${userProfile.slug}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setUserArticles(json.reverse());
          setTotal(json.length);
        });
    };
    getUserArticles();
  }, [userProfile, total]);

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
      {console.log(userProfile)}
      <div className="profile__wrapper">
        <div className="wrapper">
          <div className="profile__info">
            <EditOutlined
              className="icon__edit-profile"
              title="редактировать профиль"
              onClick={() => {
                navigate(ROUTES.PROFILEEDIT);
                window.scrollTo(0, 0);
              }}
            />
            <div className="profile__user-card">
              <div className="user-card__img">
                <img
                  src={`http://84.38.183.195/${userProfile.avatar}`}
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
                    <h3>{total}</h3>
                    <FileTextOutlined />
                  </div>
                  <p className="item__text">статей</p>
                </div>
                <Button
                  className="button button_colored user-card_btn"
                  btnText="Добавить статью"
                  onClick={handleClick}
                />
              </div>
            </div>
            <div className="user-info">
              <h3>Имя</h3>
              <h2 className="user-info__name">{userProfile.first_name}</h2>
              <h3>Фамилия</h3>
              <h2 className="user-info__name">{userProfile.last_name}</h2>
              <h3>Email</h3>
              <h3>{userProfile.email}</h3>
              <h3>Логин</h3>
              <h3>{userProfile.username}</h3>
              <h3>Пол</h3>
              <h3>{userProfile.gender === "F" ? "Ж" : "М"}</h3>
              <h3>О себе</h3>
              <p className="story__text">{userProfile.bio}</p>
            </div>
          </div>
        </div>
        {/* {!!total && <h2>Мои статьи</h2>} */}
        <h2>Мои статьи</h2>
        <div className="profile__articles">
          <div className="wrapper">
            <div className="article-gallery">{displayArticles}</div>
          </div>
        </div>
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

export default Profile;
