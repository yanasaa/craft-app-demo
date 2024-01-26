import React, { useEffect, useState } from "react";
import "./CreateArticle.scss";
import { createArticle } from "../../api/api";
import Input from "../../components/shared/ui/input/Input";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Select, Space, Upload } from "antd";
function CreateArticle() {
  const [data, setData] = useState({
    title: "",
    post_preview: "",
    body: "",
    status: "PB",
    category: 0,
    likes: [],
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getAllTags = () => {
      fetch("http://84.38.183.195/api/v1/categories/")
        .then((response) => response.json())
        .then((json) => setCategories(json));
    };
    getAllTags();
  }, []);

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  function submit(e) {
    e.preventDefault();

    const res = createArticle(data);
    console.log(res);
  }
  console.log(categories);

  return (
    <section className="new-article">
      <div className="wrapper new-article_wrapper">
        <h2>Новая статья</h2>
        <form onSubmit={(e) => submit(e)} className="new-article__form">
          <label htmlFor="title">
            <h3>Название статьи</h3>
          </label>
          <input
            className="input input_new-article"
            type="text"
            placeholder="Название статьи"
            onChange={(event) => handle(event)}
            id="title"
            value={data.title}
          />

          <label htmlFor="">
            <h3>Вид ремесла</h3>
            <select
              className="new-article__select"
              value={data.category}
              id="category"
              onChange={(event) => handle(event)}
            >
              <option
                className="hidden select__option"
                value={0}
                disabled
              ></option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  <span className="select__option">{cat.name}</span>
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="post_preview">
            <h3>Резюме статьи</h3>
          </label>
          <input
            className="input input_new-article"
            placeholder="Краткое описание статьи"
            onChange={(event) => handle(event)}
            id="post_preview"
            value={data.post_preview}
          />

          <label htmlFor="body">
            <h3>Содержание статьи</h3>
          </label>
          <textarea
            className="input input_new-article textarea__new-article"
            placeholder="Основной текст статьи"
            onChange={(event) => handle(event)}
            id="body"
            value={data.body}
          ></textarea>
          <div className="new-article__load-img">
            <h3>Загрузить изображение</h3>
            <div className="img-loader">
              {/* <span className="img-loader__icon"></span>
              <input type="file" id="img-loader__btn" />
              <label htmlFor="img-loader__btn">
                <span className="img-loader__text">загрузите фото</span>
              </label> */}
              {/* <input
                type="file"
                id="preview"
                value={data.preview}
                onChange={(event) => handle(event)}
              /> */}
            </div>
          </div>
          <button type="Submit">Опубликовать</button>
        </form>
      </div>
    </section>
  );
}

export default CreateArticle;
