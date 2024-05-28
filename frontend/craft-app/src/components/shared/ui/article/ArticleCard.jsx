import { useNavigate } from "react-router-dom";
import { LikeTwoTone } from "@ant-design/icons";
import { Tooltip } from 'antd';
import "./ArticleCard.scss";
import { ROUTE_NAMES } from "../../../../routes/routeNames";

function ArticleCard(props) {
  const { className, title, body, slug, likes, author, imgSrc, publish } =
    props;
  let navigate = useNavigate();
  function handleClick() {
    navigate(`${ROUTE_NAMES.ARTICLE}${slug}`);
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
      <Tooltip title="Читать статью" color={'#ad2e95'} mouseEnterDelay={2} arrow={false}>
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
            <p className="article-preview__text">
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
      </Tooltip>
    </div>
  );
}

export default ArticleCard;
