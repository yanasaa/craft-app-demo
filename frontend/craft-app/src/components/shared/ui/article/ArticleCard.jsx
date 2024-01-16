import { Link } from "react-router-dom";
import { LikeTwoTone } from "@ant-design/icons";
import article1 from "../../../../images/articles/article1.png";
import { ROUTES } from "../../consts/routes";
import "./ArticleCard.scss";

function articleCard(props) {
  const { className, title, body, id, slug, likes, author, imgSrc } = props;
  return (
    <div className={className}>
      <div className="card">
        <div className="article-preview__image">
          <img src={imgSrc ? imgSrc : article1} alt={title} />
        </div>
        <div className="card-body">
          <h3 className="article-preview__title">{title}</h3>
          {/* <p className="article-preview__text" dangerouslySetInnerHTML={{ __html: body }}></p> */}
          <p className="article-preview__text">{body}</p>
        </div>
        <div className="article-preview-preview__info">
          <div className="likes">
            <LikeTwoTone twoToneColor="#eb2f96" className="likes__icon icon" />
            <span>{likes}</span>
          </div>
          <span className="article-preview__date">10 Дек 2023</span>
          <span className="article-preview__author">{author}</span>
        </div>
        <Link to={`${ROUTES.MAIN}${slug}`}>Читать статью</Link>
      </div>
    </div>
  );
}

export default articleCard;
