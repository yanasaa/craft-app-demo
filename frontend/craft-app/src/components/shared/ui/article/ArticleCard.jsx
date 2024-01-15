import { Link } from "react-router-dom";
import { LikeTwoTone } from "@ant-design/icons";
import article1 from "../../../../images/articles/article1.png";
import { ROUTES } from "../../consts/routes";
import "./ArticleCard.scss";



function ArticleCard(props) {
  const { className, title, body, id, slug, likes, author } = props;
  return (
    <div className={className}>
      <div className="card">
        <div className="article-preview__image">
          <img src={article1} alt="Керамика" />
        </div>
        <div className="card-body">
          <h3 className="article__title">{title}</h3>
          <p className="article__text">{body}</p>
        </div>
        <div className="article__info">
          <div className="likes">
            <LikeTwoTone twoToneColor="#eb2f96" className="likes__icon icon" />
            <span>{likes}</span>
          </div>
          <span className="article__date">10 Дек 2023</span>
          <span className="article__author">
            {author}
          </span>
        </div>
        <Link to={`${ROUTES.MAIN}${slug}`}>Читать статью</Link>
      </div>
    </div>
  );
}

export default ArticleCard;
