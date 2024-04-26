import api from "../api/config";
import { ARTICLE_ENDPOINT, GET_ARTICLES_ENDPOINT } from "../constants/endpoints";

class ArticlesService {
  static instance = new ArticlesService();

  getArticles(searchValue) {
    return api.get(`${GET_ARTICLES_ENDPOINT}${searchValue}`);
  }
  createArticle(article, articleSlug) {
    return api.post(`${ARTICLE_ENDPOINT}/${articleSlug}`, article);
  }
//   updateProductInCart(body) {
//     return api.patch(PRODUCT_CART_ENDPOINT, body);
//   }
//   removeProductFromCart(productId) {
//     return api.delete(`${PRODUCT_CART_ENDPOINT}/${productId}`);
//   }
}

export default ArticlesService.instance;
