import React, { useEffect, useState } from "react";
import "./CreateArticle.scss";
import Input from "../../components/shared/ui/input/Input";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
function CreateArticle() {
  const [data, setData] = useState({
    title: "Кузнечное дело – традиции старины и востребованность современности",
    post_preview: "",
    body: "",
    status: "PB",
    preview: "",
    category: 0,
    likes: [0],
  });

  const url = "http://84.38.183.195/api/v1/post/create/";

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  function submit(e) {
    e.preventDefault();
    const res = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <section className="new-article">
      <div className="wrapper new-article_wrapper">
        <h2>Новая статья</h2>
        <form onSubmit={(e) => submit(e)} className="new-article__form">
          <label htmlFor="title">
            <h3>Название статьи</h3>
          </label>
          <Input
            className="input input_new-article"
            type="text"
            placeholder="Название статьи"
            onChange={(event) => handle(event)}
            id="title"
            value={data.title}
          />
          <label htmlFor="">
            <h3>Вид ремесла</h3>
          </label>
          <label htmlFor="post_preview">
            <h3>Резюме статьи</h3>
          </label>
          <Input
            className="input input_new-article"
            type="text"
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
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          </div>
          <button type="Submit">Опубликовать</button>
        </form>
      </div>
    </section>
  );
}

export default CreateArticle;
