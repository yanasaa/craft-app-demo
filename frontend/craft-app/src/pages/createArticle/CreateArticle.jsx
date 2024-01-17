import React, { useEffect, useState } from "react";
import "./CreateArticle.scss";

function CreateArticle() {
   const [data, setData] = useState({
    title: "",
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

  return (
    <section>
      <h1>Create Article</h1>
      <form onSubmit={(e) => submit(e)}>
        <input
          type="text"
          placeholder="Название статьи"
          onChange={(event) => handle(event)}
          id="title"
          value={data.title}
        />
        <input
          type="text"
          placeholder="Описание статьи"
          onChange={(event) => handle(event)}
          id="post_preview"
          value={data.post_preview}
        />
        <textarea
          placeholder="Текст статьи"
          onChange={(event) => handle(event)}
          id="body"
          value={data.body}
        ></textarea>
        <button type="Submit">Опубликовать</button>
      </form>
    </section>
  );
}

export default CreateArticle;
