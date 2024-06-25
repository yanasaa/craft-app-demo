import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import Button from "../../../../components/shared/ui/button/Button";
import { getArticlesByCategoryThunk, getArticlesBySearchThunk } from "../../../../components/ArticlesGallery/thunks";
import { articlesSelector } from "../../../../components/ArticlesGallery/selectors";
import { loginSelector } from "../../../signIn/selectors"
import { ArticlesGallery } from "../../../../components/ArticlesGallery/ArticlesGallery"
import "./Articles.scss";
import { useArticles } from "../../../../hooks/useArticles";
import { CloseOutlined } from "@ant-design/icons";

function Articles({
  categoryId,
  onClickCategory,
  searchValue,
  setSearchValue,
}) {

const dispatch = useDispatch()
const {getArticles} = useArticles()
const { tags } = useSelector(articlesSelector);
const { isAuth } = useSelector(loginSelector)
const [ showFavorites, setShowFavorites ] = useState(false)
const [ showSubsribed, setShowSubsribed ] = useState(false)
  
  useEffect(() => {
    setShowFavorites(false)
    setShowSubsribed(false)
    if(categoryId) {
      dispatch(getArticlesByCategoryThunk(categoryId))
    } else if (searchValue) {
      dispatch(getArticlesBySearchThunk(searchValue))
    } else {
      getArticles()
    }
  }, [categoryId, searchValue, dispatch]);

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

  return (
    <section className="articles" id="articles">
      <h2 className="articles__title">Статьи Авторов</h2>
      <div className="articles__filtres">
        <div className="filters__buttons">
          {isAuth && (
            <Button className='button button_colored' onClick={() => {
              setShowSubsribed(false)
              setShowFavorites(!showFavorites);
              }}>
              избранные 
              {showFavorites && <CloseOutlined style={{margin: ' 3px 4px'}} />}
            </Button>)
          }
          {isAuth && (
            <Button className='button button_colored button_pink' onClick={() => {
              setShowFavorites(false);
              setShowSubsribed(!showSubsribed)
            }}>
              подписки
              {showSubsribed && <CloseOutlined style={{margin: ' 3px 4px'}} />}
            </Button>)
          }
          {searchValue && (
            <Button className="button button_bordered articles__search-info-btn">
              <span>
                {`поиск "${searchValue.length > 10 ? searchValue.slice(0, 11) + '...' : searchValue}"`}
              </span>
              <CloseOutlined onClick={() => setSearchValue("")} style={{margin: ' 3px 4px', color: '#ad2e95'}} />
          </Button>)}
        </div>
      <Select
      allowClear
      placeholder={categoryId ? `${category.label}` : "выбрать категорию"}
      className="articles__select"
      onChange={handleChangeCategory}
      options={selectOptions}
      onClear={() => onClickCategory(0)}
    />
      </div>
    
     
      <div className="slider__wrapper">
      <ArticlesGallery showFavorites={showFavorites} showSubsribed={showSubsribed}></ArticlesGallery>
      </div>
    </section>
  );
}

export default Articles;
