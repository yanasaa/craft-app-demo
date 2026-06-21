import {useState } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "antd";
import ArticleCard from "../shared/ui/article/ArticleCard";
import Button from "../shared/ui/button/Button";
import { useArticles } from "../../hooks/useArticles";
import { profileSelector } from "../../pages/profile/selectors"
import "./ArticlesGallery.scss";

export const ArticlesGallery = ({
    showFavorites,
    showSubsribed
}) => {
  const { allArticles, articlesQuantity, favoritesArticles} = useArticles();
  const {currentUser} = useSelector(profileSelector)
  // const subscribedArticles = allArticles.filter((article) => currentUser.following.includes(article.author))
  const subscribedArticles = allArticles.filter((article) =>
    (currentUser?.following || []).includes(article.author_username)
  );
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const indexOfFirstPage = page * postsPerPage - postsPerPage;
  const indexOfLastPage = indexOfFirstPage + postsPerPage;

  const currentPosts = (showFavorites ? favoritesArticles : showSubsribed ? subscribedArticles : allArticles).slice(indexOfFirstPage, indexOfLastPage);
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

// console.log(subscribedArticles);
  return (
    <section className="articles" id="articles">  
      <div className="slider__wrapper">
        <div className="articles__wrapper">
          <div className="wrapper">
            <div className="slider">
              <div className="article-gallery">{displayArticles}</div>
            </div>
          </div>
        </div>
        <div className="pagination">
          <Pagination
          defaultCurrent={1}
            onChange={changePage}
            total={articlesQuantity}
            pageSize={postsPerPage}
            current={page}
            showSizeChanger={false}
            showQuickJumper
            locale={{ jump_to: "Перейти на", page: "стр" }}
            // onShowSizeChange={onShowSizeChange}

          ></Pagination>
        </div>
      </div>
    </section>
  );
};
