import { useEffect, useState } from "react";
import {
  AuditOutlined,
  FileTextOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import "./Profile.scss";
import Button from "../../components/shared/ui/button/Button";
import ArticleCard from "../../components/shared/ui/article/ArticleCard";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../components/shared/consts/routes";

const Profile = () => {
  let navigate = useNavigate();
  function handleClick() {
    navigate(ROUTES.CREATE);
  }

  const [userProfile, setUserProfile] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  useEffect(() => {
    const getUserProfile = () => {
      fetch("http://84.38.183.195/api/v1/userprofile/8/", {
        method: "GET",
        headers: {
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
      fetch("http://84.38.183.195/api/v1/posts/?search=inno", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setUserArticles(json);
          setTotal(json.length);
        });
    };
    getUserArticles();
  }, []);

  

  const indexOfFirstPage = page * postsPerPage - postsPerPage;
  const indexOfLastPage = indexOfFirstPage + postsPerPage;
  const currentPosts = userArticles.slice(indexOfFirstPage, indexOfLastPage);
  const displayArticles = currentPosts.map((article) => {
    return (
      <ArticleCard
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
      {console.log(userArticles)}
      <div className="profile__wrapper">
        <div className="wrapper">
          <div className="profile__info">
            <div className="profile__user-card">
              <div className="user-card__img">
                <img src={userProfile.avatar} alt="user" />
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
              <div className="user-info__text">
                <h2 className="user-info__name">{`${userProfile.first_name} ${userProfile.last_name}`}</h2>
                <div className="user-info__data">
                  <h3>NO LOGIN</h3>
                  <h3>{userProfile.gender}</h3>
                  <h3>{userProfile.email}</h3>
                </div>
              </div>
              <div className="user-info__story">
                <h3>О себе:</h3>
                <p className="story__text">{userProfile.bio}</p>
              </div>
            </div>
          </div>
          </div>
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
                
              ></Pagination>
            </div>
    </section>
  );
};

export default Profile;
