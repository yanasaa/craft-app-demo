import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Tooltip } from 'antd';
import { HashLink } from "react-router-hash-link";
import { useArticles } from "../../../../hooks/useArticles";
import "./SearchBar.scss";

function SearchBar(props) {
  const { className, searchValue, setSearchValue, setCategoryId, scrollToArticles } = props;
  const {getArticles} = useArticles;
  function handleKeyPress(e) {
    if (searchValue && e.key === "Enter") {
      scrollToArticles()
    }
  }
  return (
    <div className={className}>
       <input
        className="search__input"
        value={searchValue}
        type="search"
        placeholder="Поиск по автору или названию"
        onChange={(event) => {
          setCategoryId(null);
          setSearchValue(event.target.value);
        }}
        onKeyDown={handleKeyPress}
      />
      {searchValue && (
        <CloseOutlined 
        className="icon search-clear__btn"
        title="Очистить"
        onClick={() => setSearchValue("")}
        />
      )}
      <div className="search__icons">
        <HashLink to='#articles'>
          <Tooltip title="Найти статьи" color={'#ad2e95'} mouseEnterDelay={1} arrow={false}>
              <SearchOutlined
                className="icon search__icon"
                style={{ fontSize: "32px", color: "#ad2e95" }}
              />
          </Tooltip>
        </HashLink>
      </div>
    </div>
  );
}

export default SearchBar;
