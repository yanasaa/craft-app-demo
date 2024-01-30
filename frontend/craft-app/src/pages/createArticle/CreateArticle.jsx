import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./CreateArticle.scss";
import { createArticle } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../components/shared/consts/routes";

function CreateArticle() {
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const filePicker = useRef(null);
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  let navigate = useNavigate();
  const initialData = {
    title: "",
    post_preview: "",
    body: "",
    status: "PB",
    category: 0,
    likes: [],
  };
  const [data, setData] = useState({ ...initialData });

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
  function handleChange(e) {
    setSelectedFile(e.target.files[0]);
  }

  function handlePick() {
    filePicker.current.click();
  }

  function submit(e) {
    e.preventDefault();

    const res = createArticle(data);
    console.log(res);
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (
      !selectedFile ||
      !data.title ||
      !data.post_preview ||
      !data.body ||
      !data.category
    ) {
      alert("Все поля обязательны для заполнения");
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("post_preview", data.post_preview);
    formData.append("body", data.body);
    formData.append("status", data.status);
    formData.append("category", data.category);
    formData.append("preview", selectedFile);

    const res = await fetch("http://84.38.183.195/api/v1/post/create/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: formData,
    });
    const mydata = await res.json();
    setData(initialData);
    window.scrollTo(0, 0);
    navigate(ROUTES.PROFILE);
  };

  return (
    <section className="new-article">
      <div className="wrapper new-article_wrapper">
        <h2>Новая статья</h2>
        <form onSubmit={(e) => handleUpload(e)} className="new-article__form">
          <label htmlFor="title">
            <h3>Название статьи</h3>
          </label>
          <input
            name="title"
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
                <option key={cat.id} value={cat.id} className="select__option">
                  {cat.name}
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
              {!selectedFile ? (
                <>
                  <PlusOutlined
                    className="icon icon__load-img"
                    onClick={handlePick}
                  />
                  <p>Загрузите фото</p>
                </>
              ) : (
                <>
                  <span>{selectedFile.name}</span>
                  <DeleteOutlined
                    className="icon__delete-img"
                    onClick={() => setSelectedFile()}
                  />
                  <p>Фото загружено</p>
                </>
              )}

              <input
                className="hidden"
                type="file"
                id="preview"
                ref={filePicker}
                onChange={handleChange}
                accept="image/* .png, .jpg, .jpeg"
              />
            </div>
          </div>
          <div className="new-article__buttons">
            <button
              className="button button_bordered new-article__button"
              type="Submit"
            >
              Сохранить черновик
            </button>

            <button
              className="button button_colored new-article__button"
              type="Submit"
            >
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateArticle;
