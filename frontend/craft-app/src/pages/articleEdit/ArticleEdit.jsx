import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./ArticleEdit.scss";
import { ROUTES } from "../../components/shared/consts/routes";

function ArticleEdit() {
  let navigate = useNavigate();
  function handleCancelClick() {
    navigate(ROUTES.ARTICLE);
    window.scrollTo(0, 0);
  }
  const { id } = useParams();
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const [articleInfo, setArticleInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const filePicker = useRef(null);
  function handleChange(e) {
    setSelectedFile(e.target.files[0]);
  }
  function handlePick() {
    filePicker.current.click();
  }

  const initialData = {
    title: articleInfo.title || "",
    post_preview: articleInfo.post_preview || "",
    body: articleInfo.body || "",
    status: "PB",
    category: articleInfo.category || 0,
    likes: articleInfo.likes || [],
    preview: articleInfo.preview || "",
  };
  // const [data, setData] = useState({ ...initialData });

  useEffect(() => {
    const getAllTags = () => {
      fetch("http://84.38.183.195/api/v1/categories/")
        .then((response) => response.json())
        .then((json) => setCategories(json));
    };
    getAllTags();
  }, []);

  console.log(articleInfo);

  useEffect(() => {
    const getArticleInfo = () => {
      fetch(`http://84.38.183.195/api/v1/post/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setArticleInfo(json);
        });
    };
    getArticleInfo();
  }, []);

  function handle(e) {
    const newData = { ...articleInfo };

    newData[e.target.id] = e.target.value || "";
    setArticleInfo(newData);
    console.log(newData);
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (
      !selectedFile ||
      !articleInfo.title ||
      !articleInfo.post_preview ||
      !articleInfo.body ||
      !articleInfo.category
    ) {
      alert("Все поля обязательны для заполнения");
      return;
    }
    const formData = new FormData();
    formData.append("title", articleInfo.title);
    formData.append("post_preview", articleInfo.post_preview);
    formData.append("body", articleInfo.body);
    formData.append("status", articleInfo.status);
    formData.append("category", articleInfo.category);
    formData.append("preview", selectedFile);

    const res = await fetch(
      `http://84.38.183.195/api/v1/post/${articleInfo.id}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: formData,
      }
    );
    const mydata = await res.json();
    console.log(mydata);
    setArticleInfo(initialData);
    window.scrollTo(0, 0);
    navigate(ROUTES.ARTICLE);
  };

  return (
    <section className="new-article">
      <div className="wrapper new-article_wrapper">
        <h2>Редактирование статьи</h2>
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
            value={articleInfo.title}
          />
          <label htmlFor="">
            <h3>Вид ремесла</h3>
            <select
              className="new-article__select"
              value={articleInfo.category}
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
            value={articleInfo.post_preview}
          />
          {/* <Editor
            // editorState={editorState}
            // onEditorStateChange={this.onEditorStateChange}
          /> */}

          <label htmlFor="body">
            <h3>Содержание статьи</h3>
          </label>
          <textarea
            className="input input_new-article textarea__new-article"
            placeholder="Основной текст статьи"
            onChange={(event) => handle(event)}
            id="body"
            value={articleInfo.body}
          ></textarea>
          <div className="new-article__load-img">
            {/* <img src={articleInfo.preview} alt="ttt" /> */}
            <h3>Загрузить изображение</h3>
            <div
              className="img-loader"
              style={{
                background: articleInfo.preview
                  ? `url(${articleInfo.preview})`
                  : "",
              }}
            >
              {console.log(articleInfo.preview)}
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
              className="button button_bordered"
              onClick={handleCancelClick}
            >
              Отмена
            </button>

            <button
              className="button button_colored"
              style={{ color: "white" }}
              type="Submit"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ArticleEdit;
