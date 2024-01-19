import { Pagination } from "antd";
import { useEffect, useState } from "react";
import "./Articles.scss";
import ArticleCard from "../../../../components/shared/ui/article/ArticleCard";
import Button from "../../../../components/shared/ui/button/Button";

function Articles({
  categoryId,
  onClickCategory,
  searchValue,
  setSearchValue,
}) {
  console.log(searchValue, "articles");
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const url = categoryId
    ? `http://84.38.183.195/api/v1/category/${categoryId}`
    : `http://84.38.183.195/api/v1/posts/?search=${searchValue}`;

  useEffect(() => {
    const getAllArticles = () => {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setArticles(json);
          setTotal(json.length);
        });
    };
    getAllArticles();
  }, [categoryId, searchValue, url]);

  const indexOfFirstPage = page * postsPerPage - postsPerPage;
  const indexOfLastPage = indexOfFirstPage + postsPerPage;
  const currentPosts = articles.slice(indexOfFirstPage, indexOfLastPage);
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
    <section className="articles" id="articles">
      <h2 className="articles__title">Статьи Авторов</h2>
      {!!categoryId && (
        <Button
          className="button button_colored articles__filter-btn"
          btnText="Сбросить фильтры"
          onClick={() => onClickCategory(0)}
        />
      )}
      <div className="slider__wrapper">
        <div className="articles__wrapper">
          <div className="wrapper">
            <div className="slider">
              <div className="article-gallery">{displayArticles}</div>
              {/* <div className="slider__button slider__button_left">
                <span className="icon slider__icon_left slider__icon"></span>
              </div>
              <div className="slider__button slider__button_right">
                <span className="icon slider__icon_right slider__icon"></span>
              </div> */}
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
      </div>
    </section>
  );
}

export default Articles;
