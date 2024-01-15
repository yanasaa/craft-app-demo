import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Input from "../input/Input";
import "./SearchBar.scss";

function SearchBar(props) {
  const { className } = props;
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={className}>
      {isActive && (
        <Input className="search__input" type="search" placeholder="Поиск" focus={true}/>
      )}
      <div className="search__icons" onClick={() => setIsActive(!isActive)}>
        <SearchOutlined
          className="icon search__icon"
          style={{ fontSize: "32px", color: "#ad2e95" }}
        />
      </div>
    </div>
  );
}

export default SearchBar;
