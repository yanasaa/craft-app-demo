import { useEffect, useState } from "react";
import { Pagination } from "antd";
import ArticleCard from "../shared/ui/article/ArticleCard";
import Button from "../shared/ui/button/Button";
import { useArticles } from "../../hooks/useArticles";
import "./ArticlesGallery.scss";

export const ArticlesGallery = ({
  categoryId,
  onClickCategory,
  searchValue,
  posts,
}) => {
  const { allArticles, getArticles } = useArticles();
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const url = categoryId
    ? `http://84.201.140.115/api/v1/category/${categoryId}`
    : `http://84.201.140.115/api/v1/posts/?search=${searchValue}`;

  useEffect(() => {
    getArticles();
  }, [categoryId, searchValue, url]);

  const totalPages = allArticles.length;

  const [postsPerPage, setPostsPerPage] = useState(6);

  // useEffect(() => {
  //   const getAllArticles = () => {
  //     fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setTotal(json.length);
  //         setPage(1);
  //       });
  //   };
  //   getAllArticles();
  // }, [categoryId, searchValue, url]);

  const indexOfFirstPage = page * postsPerPage - postsPerPage;
  const indexOfLastPage = indexOfFirstPage + postsPerPage;
  const currentPosts = allArticles.slice(indexOfFirstPage, indexOfLastPage);
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
            onChange={changePage}
            total={totalPages}
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
};
