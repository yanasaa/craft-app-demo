const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
const url = "http://84.38.183.195/api/v1/post/create/";

export function createArticle(data) {
  const res = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
  return res;
}

