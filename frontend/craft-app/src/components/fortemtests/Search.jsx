import React, { useState } from "react";
import data from "./data";


function Search() {
    const [filter, setFilter] = useState('');
    const [isActive, setIsActive] = useState('false');

    const searchText = (event) => {
        setFilter(event.target.value)
    }

    let dataSearch = data.cardData.filter(item => {
        return Object.keys(item).some(key => 
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
            )
    })

    return (
        <section>
            <div className="">

                <div>
                    <div>
                        <label>Search</label>
                        <div className="search-bar">
                        {isActive && <input className="search__input" type="search" placeholder="Поиск" value={filter} onChange={searchText.bind(this)}/>}
                        <div className="search__icons">
                            <span className="icon search__icon" onClick={e => setIsActive(!isActive)}></span>
                        </div>
                        </div>
                    </div>

                </div>


                {dataSearch.map((item, index) => {
                    return (
                       
                    <div className="card" key={index}>
                        <div className="article-preview">
                        <div className="article-preview__image">
                        <img
                            src={item.img}
                            alt="Керамика"
                        />
                        </div>
                        <div className="card-body">
                            <h3 className="article__title">{item.title}</h3>
                            <p className="article__text">{item.body}</p>
                            <div className="article__info">
                            <div className="likes">
                                <span className="likes__icon icon"></span>156
                            </div>
                            <span className="article__date">10 Дек 2023</span>
                            <span className="article__author">Анна Попова</span>
                            </div>
                            </div>
                        </div>
                    </div>

                    )
                })}
                
            </div>
        </section>
    )
}

export default Search;