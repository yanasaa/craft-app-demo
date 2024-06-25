import SearchBar from "../../../../components/shared/ui/searchBar/SearchBar";
import "./Hero.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTagsThunk } from "../../../../components/ArticlesGallery/thunks";
import { articlesSelector } from "../../../../components/ArticlesGallery/selectors";
import { HashLink } from "react-router-hash-link";

function Hero({ categoryId, onClickCategory, searchValue, setSearchValue, setCategoryId, scrollToArticles }) {
  const dispatch = useDispatch()
  const {tags} = useSelector(articlesSelector)

  useEffect(() => {
    dispatch(getAllTagsThunk())
   }, [dispatch]);

  //  function getUniqTags(tags) {
  //   return Array.from(new Set(shuffle(tags).map((el) => el.tag)));
  // }

  // function shuffle(arr) {
  //   let j, temp;
  //   for (let i = arr.length - 1; i > 0; i--) {
  //     j = Math.floor(Math.random() * (i + 1));
  //     temp = arr[j];
  //     arr[j] = arr[i];
  //     arr[i] = temp;
  //   }
  //   return arr;
  // }

  return (
    <section className="hero" id="hero">
      <div className="wrapper hero__wrapper">
        <div className="glass hero__glass">
          <h1 className="hero__title">CRAFTSHARE</h1>
          <div className="hero__content">
            <h2 className="hero__text">
              Cервис для ремесленников и для тех, кто хочет научиться чему-то новому
            </h2>
            <SearchBar
              className="search-bar_hero"
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setCategoryId={setCategoryId}
              scrollToArticles={scrollToArticles}
            />
            <div className="hero__tags">
              <div className="hero__tags_layout">
                {(tags)
                  .slice(0, 8)
                  .map((el, i) => (
                    <HashLink
                      className="tag"
                      key={el.id}
                      onClick={() => onClickCategory(el.id)}
                      to='#articles'
                    >
                      <h3 className="tag__title">{el.name.toLowerCase()}</h3>
                    </HashLink>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
