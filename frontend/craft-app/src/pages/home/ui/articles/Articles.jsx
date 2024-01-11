import { Pagination } from "antd";
import { useState } from "react";
import data from "../../../../components/fortemtests/data";
import "./Articles.scss";
import article1 from "../../../../images/articles/article1.png";
import Image from "../../../../components/shared/ui/image/Image";
import second from "../../../../components/shared/ui/article/ArticleCard";
import ArticleCard from "../../../../components/shared/ui/article/ArticleCard";

function Articles() {
  const [articles, setArticles] = useState([data.cardData.slice(0, 50)]);
  const [pageNumber, setPageNumber] = useState(0);

  const articlesPerPage = 6;
  const pagesVisited = pageNumber * articlesPerPage;

  const displayArticles = articles
    .slice(pagesVisited, pagesVisited + articlesPerPage)
    .map((article) => {
      <ArticleCard className="card" key={article.id} />;
    });

  return (
    <section className="articles" id="articles">
      <h2 className="articles__title">Статьи Авторов</h2>
      <div className="slider__wrapper">
        <div className="articles__wrapper">
          <div className="wrapper">
            <div className="slider">
              <div className="article-gallery layout-3-columns">
                {data.cardData.map((item) => (
                  <ArticleCard className="card" key={item.id} />
                ))}
              </div>

              <div className="slider__button slider__button_left">
                <span className="icon slider__icon_left slider__icon"></span>
              </div>
              <div className="slider__button slider__button_right">
                <span className="icon slider__icon_right slider__icon"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="pagination">
          <Pagination total={data.cardData.length} pageSize={6}></Pagination>
        </div>
      </div>
    </section>
  );
}

export default Articles;
