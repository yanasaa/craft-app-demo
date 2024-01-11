import SearchBar from "../../../../components/shared/ui/searchBar/SearchBar";
import "./Hero.scss";
import data from "../../../../components/fortemtests/data";

function Hero() {
  const unicTags = Array.from(new Set(data.cardData.map((el) => el.tag)));
  return (
    <section className="hero" id="hero">
      <div className="wrapper hero__wrapper">
        <div className="glass hero__glass">
          <h1 className="hero__title hero__content">CRAFTSHARE</h1>
          <div className="hero__content">
            <p className="hero__text">
              Cервис для ремесленников и для тех, кто хочет научиться чему-то
              новому
            </p>
            <SearchBar className="search-bar_hero" isActive={true} />
            <div className="hero__tags">
              <div className="layout-2-columns hero__tags_layout">
                {unicTags.map(
                  (el, index) =>
                    el && (
                      <div className="tag" key={index}>
                        <h3 className="tag__title">{el}</h3>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
