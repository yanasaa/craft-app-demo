import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import ArticleCard from "../../../../components/shared/ui/article/ArticleCard";
import Button from "../../../../components/shared/ui/button/Button";
import { getArticlesByCategoryThunk, getArticlesBySearchThunk, getArticlesThunk } from "../../../../components/ArticlesGallery/thunks";
import { articlesSelector } from "../../../../components/ArticlesGallery/selectors";
import { loginSelector } from "../../../signIn/selectors"
import { ArticlesGallery } from "../../../../components/ArticlesGallery/ArticlesGallery"
import "./Articles.scss";
import { useArticles } from "../../../../hooks/useArticles";

function Articles({
  categoryId,
  onClickCategory,
  searchValue,
  setSearchValue,
}) {

const [favourites, setFavourites] = useState([]);
const dispatch = useDispatch()
const {getArticles} = useArticles()
const { articles, tags } = useSelector(articlesSelector);
const { isAuth } = useSelector(loginSelector)
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  
  useEffect(() => {
    
  if(categoryId) {
    dispatch(getArticlesByCategoryThunk(categoryId))
  } else if (searchValue) {
    dispatch(getArticlesBySearchThunk(searchValue))
   } else if (favourites) {
    getArticles()
  } else {

    getArticles()
  }
  
  }, [categoryId, searchValue, dispatch]);

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

  const getFavouriteArticles = () => {
    const favArticles = articles.filter((article) => article.is_favorited)
    setFavourites(favArticles)
  }

  

  const selectOptions = tags.map((tag) => {
    return {value: tag.id, label: tag.name}
  })
  
  const category = selectOptions.find((tag) => tag.value === categoryId)

  const handleChangeCategory = (value) => { 
    if (!categoryId) {
      onClickCategory(0)
      setSearchValue('')
    }
    onClickCategory(value)
  };
console.log(category);
  return (
    <section className="articles" id="articles">
      <h2 className="articles__title">Статьи Авторов</h2>
      <div>
        {isAuth && <button className='button button_colored' onClick={() => {getFavouriteArticles()}}>избранные</button>}
        {isAuth && <button className='button button_colored button_pink' onClick={() => {getFavouriteArticles()}}>подписки</button>}
        {searchValue && (
          <button className="button button_bordered articles__search-info-btn">
            <span>
              {`поиск по запросу "${searchValue}"`}
            </span>
            <span
              className="icon search-clear__btn"
              title="Очистить"
              onClick={() => setSearchValue("")}
            ></span>
         </button>)}
      </div>
      <Select
      allowClear
      placeholder={categoryId ? `${category.label}` : "выбрать категорию"}
      className="articles__select"
      onChange={handleChangeCategory}
      options={selectOptions}
      onClear={() => onClickCategory(0)}
    />
    
     
      <div className="slider__wrapper">
      <ArticlesGallery searchValue={searchValue}></ArticlesGallery>
      </div>
    </section>
  );
}

export default Articles;
