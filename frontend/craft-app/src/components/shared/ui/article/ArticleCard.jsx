import data from "../../../fortemtests/data";
import { LikeTwoTone } from "@ant-design/icons";
import article1 from "../../../../images/articles/article1.png";
import "./ArticleCard.scss";
import Image from "../image/Image";

function ArticleCard(props) {
  const { className } = props;
  return (
    <div className={className}>
      <div className="card">
        <div className="article-preview__image">
          <img src={article1} alt="Керамика" />
        </div>
        <div className="card-body">
          <h3 className="article__title">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, cum.
          </h3>
          <p className="article__text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
            veniam cupiditate itaque repellendus laborum animi consectetur modi
            ea neque natus facere esse impedit eum quam quisquam, tempore nobis
            dolorum officia veritatis nesciunt? Cupiditate nam, dolore, quasi
            minus, ipsam voluptatibus recusandae minima repellat vitae soluta
            libero laborum animi illum? Ratione, quas.
          </p>
          <div className="article__info">
            <div className="likes">
              <LikeTwoTone
                twoToneColor="#eb2f96"
                className="likes__icon icon"
              />
              156
            </div>
            <span className="article__date">10 Дек 2023</span>
            <span className="article__author">Анна Попова</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
