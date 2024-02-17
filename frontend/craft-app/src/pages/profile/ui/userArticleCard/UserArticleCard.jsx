import { generatePath, useNavigate } from "react-router-dom";
import { LikeTwoTone, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./UserArticleCard.scss";
import { ROUTES } from "../../../../components/shared/consts/routes";

function UserArticleCard(props) {
  const { className, title, body, slug, likes, imgSrc, setTotal } = props;
  let navigate = useNavigate();
  function handleClick() {
    navigate(`${ROUTES.MAIN}${slug}`);
    window.scrollTo(0, 0);
  }

  function deleteArticle() {
    const res = fetch(`http://84.38.183.195/api/v1/post/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())

      .catch((error) => {
        console.log(error);
      });
    setTotal();
  }

  return (
    <div className={className}>
      <div className="card">
        <div className="article-preview__image" onClick={handleClick}>
          <img
            src={
              imgSrc
                ? imgSrc
                : "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop"
            }
            alt={title}
          />
        </div>
        <div className="card-body" onClick={handleClick}>
          <h3 className="article-preview__title">{title}</h3>
          {/* <p className="article-preview__text" dangerouslySetInnerHTML={{ __html: body }}></p> */}
          <p className="article-preview__text" title={body}>
            {body}
          </p>
        </div>
        <div className="article-preview__info">
          <div className="likes">
            <LikeTwoTone twoToneColor="#ad2e95" className="likes__icon icon" />
            <span>{likes}</span>
          </div>
          <div className="card__actions">
            <EditOutlined
              className="icon__user-card_action"
              title="редактировать"
              onClick={() => {
                navigate(
                  generatePath(ROUTES.ARTICLEEDIT, { id: String(slug) })
                );
                window.scrollTo(0, 0);
              }}
            />
            <DeleteOutlined
              onClick={deleteArticle}
              className="icon__user-card_action"
              title="удалить"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserArticleCard;
