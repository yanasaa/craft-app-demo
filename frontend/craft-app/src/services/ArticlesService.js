import api from "../api/config";
import { ARTICLE_ENDPOINT, GET_ARTICLES_ENDPOINT, LIKE_ARTICLE } from "../constants/endpoints";

class ArticlesService {
  static instance = new ArticlesService();

  getArticles(searchValue) {
    return api.get(`${GET_ARTICLES_ENDPOINT}${searchValue}`);
  }
  getProfileArticles(userSlug) {
    return api.get(`${GET_ARTICLES_ENDPOINT}?username=${userSlug}`);
  }
  createArticle(article, articleSlug) {
    return api.post(`${ARTICLE_ENDPOINT}/${articleSlug}`, article);
  }
  getSingleArticle(articleSlug) {
    return api.get(`${ARTICLE_ENDPOINT}${articleSlug}`);
  }
  likeDislikeArticle(articleId) {
    return api.post(`${LIKE_ARTICLE}${articleId}`);
  }

//   removeProductFromCart(productId) {
//     return api.delete(`${PRODUCT_CART_ENDPOINT}/${productId}`);
//   }
}

export default ArticlesService.instance;
