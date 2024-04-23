import SearchBar from "../../../../components/shared/ui/searchBar/SearchBar";
import "./Hero.scss";
import { useEffect, useState } from "react";

function Hero({ categoryId, onClickCategory, searchValue, setSearchValue }) {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const getAllTags = () => {
      fetch("http://84.201.140.115/api/v1/categories")
        .then((response) => response.json())
        .then((json) => setTags(json))
    };
    getAllTags();
  }, []);

  
  function getUniqTags(tags) {
    return Array.from(new Set(shuffle(tags).map((el) => el.tag)));
  }

  function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  return (
    <section className="hero" id="hero">
      <div className="wrapper hero__wrapper">
        <div className="glass hero__glass">
          <h1 className="hero__title">CRAFTSHARE</h1>
          <div className="hero__content">
            <p className="hero__text">
              Cервис для ремесленников и для тех, кто хочет научиться чему-то новому
            </p>
            <SearchBar
              className="search-bar_hero"
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <div className="hero__tags">
              <div className="hero__tags_layout">
                {(tags)
                  .slice(0, 8)
                  .map((el, i) => (
                    <div
                      className="tag"
                      key={el.id}
                      onClick={() => onClickCategory(el.id)}
                    >
                      <h3 className="tag__title">{el.name.toLowerCase()}</h3>
                    </div>
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
