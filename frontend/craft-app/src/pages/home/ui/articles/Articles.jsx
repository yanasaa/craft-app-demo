import { Pagination } from "antd";
import { useEffect, useState } from "react";
import data from "../../../../components/fortemtests/data";
import "./Articles.scss";
import ArticleCard from "../../../../components/shared/ui/article/ArticleCard";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    const getAllArticles = () => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          setArticles(json);
          setTotal(json.length);
        });
    };
    getAllArticles();
  }, []);

  console.log(articles);
  const indexOfLastPage = page + postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPosts = articles.slice(indexOfFirstPage, indexOfLastPage);

  const displayArticles = currentPosts.map((article) => {
    return (
      <ArticleCard
        className="article-preview"
        key={article.id}
        title={article.title}
        body={article.body}
      />
    );
  });

  const changePage = (value) => {
    setPage(value);
  };
  const onShowSizeChange = (current, pageSize) => {
    setPostsPerPage(pageSize);
  };

  // -----------Может пригодиться для слайдера
  // const itemRender = (current, type, originalElement) => {
  //   if (type === "prev") {
  //     return <a>Previous</a>;
  //   }
  //   if (type === "next") {
  //     return <a>Next</a>;
  //   }
  //   return originalElement;
  // };

  return (
    <section className="articles" id="articles">
      <h2 className="articles__title">Статьи Авторов</h2>
      <div className="slider__wrapper">
        <div className="articles__wrapper">
          <div className="wrapper">
            <div className="slider">
              <div className="article-gallery layout-3-columns">
                {displayArticles}
              </div>
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
            showSizeChanger
            showQuickJumper
            onShowSizeChange={onShowSizeChange}
            pageSizeOptions={[6, 9, 30, 90]}
            // itemRender={itemRender}
          ></Pagination>
        </div>
      </div>
    </section>
  );
}

export default Articles;
