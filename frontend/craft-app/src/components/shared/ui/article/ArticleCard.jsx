import { useNavigate } from "react-router-dom";
import { LikeTwoTone } from "@ant-design/icons";
import { ROUTES } from "../../consts/routes";
import "./ArticleCard.scss";

function ArticleCard(props) {
  const { className, title, body, slug, likes, author, imgSrc, publish } =
    props;
  let navigate = useNavigate();
  function handleClick() {
    navigate(`${ROUTES.MAIN}${slug}`);
    window.scrollTo(0, 0);
  }

  function getDate(date) {
    let myDate = new Date(date);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return myDate.toLocaleString("ru-RU", options);
  }
  return (
    <div className={className} onClick={handleClick}>
      <div className="card">
        <div className="article-preview__image">
          <img
            src={
              imgSrc
                ? imgSrc
                : "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop"
            }
            alt={title}
          />
        </div>
        <div className="card-body">
          <h3 className="article-preview__title">{title}</h3>
          {/* <p className="article-preview__text" dangerouslySetInnerHTML={{ __html: body }}></p> */}
          <p className="article-preview__text" title={body}>
            {body}
          </p>
        </div>
        <div className="article-preview__info">
          <div className="likes">
            <LikeTwoTone twoToneColor="#eb2f96" className="likes__icon icon" />
            <span>{likes}</span>
          </div>
          <span className="article-preview__date">
            {publish ? getDate(publish) : ""}
          </span>
          <p className="article-preview__author">{author}</p>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
