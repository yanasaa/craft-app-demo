import { SearchOutlined } from "@ant-design/icons";
import "./SearchBar.scss";

function SearchBar(props) {
  const { className, searchValue, setSearchValue } = props;
  // const [isActive, setIsActive] = useState(false);
  return (
    <div className={className}>
      {/* {isActive && ( */}
      <input
        className="search__input"
        value={searchValue}
        type="search"
        placeholder="Поиск по автору или названию статьи"
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
      {searchValue && (
        <span className="icon search-clear__btn" title="Очистить" onClick={() => setSearchValue('')}></span>
      )}
      <div className="search__icons">
        <SearchOutlined
          className="icon search__icon"
          title="Найти"
          style={{ fontSize: "32px", color: "#ad2e95" }}
          onClick={() => window.scrollTo(0, 2150)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
