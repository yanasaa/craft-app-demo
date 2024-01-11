import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Input from "../input/Input";
import './SearchBar.scss';

function SearchBar(props) {
  const {className} = props;
  const [isActive, setIsActive] = useState(false)
    return (
        <div className={className}>
          {isActive && <Input className="search__input" type="search" placeholder="Поиск" />}
          <div className="search__icons">
            <SearchOutlined className="icon search__icon" onClick={e => setIsActive(!isActive)} />
          </div>
        </div>
    )
}

export default SearchBar;