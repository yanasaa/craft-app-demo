import { SearchOutlined } from "@ant-design/icons";
import { Tooltip } from 'antd';
import "./SearchBar.scss";

function SearchBar(props) {
  const { className, searchValue, setSearchValue } = props;
  // const [isActive, setIsActive] = useState(false);
  function handleKeyPress(e) {
    if (searchValue && e.key === "Enter") {
      window.scrollTo(0, 2150);
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
          setSearchValue(event.target.value);
        }}
        onKeyDown={handleKeyPress}
      />
      {searchValue && (
        <span
          className="icon search-clear__btn"
          title="Очистить"
          onClick={() => setSearchValue("")}
        ></span>
      )}
      <div className="search__icons">
        <Tooltip title="Найти статьи" color={'#ad2e95'} mouseEnterDelay={1} arrow={false}>
          <SearchOutlined
            className="icon search__icon"
            style={{ fontSize: "32px", color: "#ad2e95" }}
            onClick={() => window.scrollTo(0, 2150)}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default SearchBar;
