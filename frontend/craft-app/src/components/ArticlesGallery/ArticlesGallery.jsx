import {useState } from "react";
import { Pagination } from "antd";
import ArticleCard from "../shared/ui/article/ArticleCard";
import Button from "../shared/ui/button/Button";
import { useArticles } from "../../hooks/useArticles";
import "./ArticlesGallery.scss";

export const ArticlesGallery = ({
  categoryId,
  onClickCategory,
  searchValue,
  showFavorites,
}) => {
  const { allArticles, articlesQuantity, favoritesArticles} = useArticles();
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const indexOfFirstPage = page * postsPerPage - postsPerPage;
  const indexOfLastPage = indexOfFirstPage + postsPerPage;
  const currentPosts = (showFavorites ? favoritesArticles : allArticles).slice(indexOfFirstPage, indexOfLastPage);


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

console.log(showFavorites);
  return (
    <section className="articles" id="articles">
      {(!!categoryId) && (
        <Button
          className="articles__filter-btn"
          onClick={() => onClickCategory(0)}
        >
          Отменить фильтр
        </Button>
      )}
    
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
