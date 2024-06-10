import api from "../api/config";
import { ARTICLE_ENDPOINT, GET_ARTICLES_ENDPOINT, LIKE_ARTICLE, GET_CATEGORIES, GET_ARTICLES_BY_CATEGORY } from "../constants/endpoints";

class ArticlesService {
  static instance = new ArticlesService();

  getArticles() {
    return api.get(`${GET_ARTICLES_ENDPOINT}`);
  }
  getProfileArticles(userSlug) {
    return api.get(`${GET_ARTICLES_ENDPOINT}?username=${userSlug}`);
  }
  getArticlesBySearch(searchValue) {
    return api.get(`${GET_ARTICLES_ENDPOINT}?search=${searchValue}`);
  }
  getArticlesByCategory(categoryId) {
    return api.get(`${GET_ARTICLES_BY_CATEGORY}${categoryId}`);
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

  getAllTags() {
    return api.get(GET_CATEGORIES)
  }
}

export default ArticlesService.instance;
