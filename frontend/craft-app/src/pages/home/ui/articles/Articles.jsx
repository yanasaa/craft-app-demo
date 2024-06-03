import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Articles.scss";
import ArticleCard from "../../../../components/shared/ui/article/ArticleCard";
import Button from "../../../../components/shared/ui/button/Button";
import { getArticlesThunk } from "../../../../components/ArticlesGallery/thunks";
import { articlesSelector } from "../../../../components/ArticlesGallery/selectors";
import { loginSelector } from "../../../signIn/selectors"
import { ArticlesGallery } from "../../../../components/ArticlesGallery/ArticlesGallery"

function Articles({
  categoryId,
  onClickCategory,
  searchValue,
  setSearchValue,
}) {
  
  const [favourites, setFavourites] = useState([]);
const dispatch = useDispatch()
const { articles } = useSelector(articlesSelector);
const { isAuth } = useSelector(loginSelector)
  // const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const url = categoryId
    ? `http://84.201.140.115/api/v1/category/${categoryId}`
    : `http://84.201.140.115/api/v1/posts/?search=${searchValue}`;

  useEffect(() => {
    dispatch(getArticlesThunk(''))
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

  const getFavouriteArticles = () => {
    const favArticles = articles.filter((article) => article.is_favorited)
    setFavourites(favArticles)

  }
console.log(articles);
  return (
    <section className="articles" id="articles">
      <h2 className="articles__title">Статьи Авторов</h2>
      {isAuth && <button onClick={() => {getFavouriteArticles()}}>избранные</button>}
      {!!categoryId && (
        <Button
          className="articles__filter-btn"
          onClick={() => onClickCategory(0)}
        >Отменить фильтр</Button>
      )}
      <div className="slider__wrapper">
      <ArticlesGallery searchValue={searchValue}></ArticlesGallery>
        {/* <div className="articles__wrapper">
          
          <div className="wrapper">
          
            <div className="slider">
              
              <div className="article-gallery">{displayArticles}</div>
            </div>
          </div>
        </div>
        <div className="pagination">
          <Pagination
            onChange={changePage}
            // total={total}
            // pageSize={postsPerPage}
            // current={page}
            // showSizeChanger={false}
            showQuickJumper
            locale={{ jump_to: "Перейти на", page: "стр" }}
            // onShowSizeChange={onShowSizeChange}
            // hideOnSinglePage
            defaultPageSize={6} total={articles.length} 
          ></Pagination>
        </div> */}
      </div>
    </section>
  );
}

export default Articles;
