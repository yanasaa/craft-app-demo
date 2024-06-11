import { useDispatch, useSelector } from "react-redux";
import { articlesSelector } from "../components/ArticlesGallery/selectors";
import { getArticlesThunk, getProfileArticlesThunk } from "../components/ArticlesGallery/thunks";
import { useCallback } from "react";

export const useArticles = () => {
  const { articles, isLoading, errors, favorites } = useSelector(articlesSelector);
  const dispatch = useDispatch();

  const getArticles = useCallback(() => {
    dispatch(getArticlesThunk());
  }, [dispatch]);
  const getProfileArticles = useCallback((userSlug) => {
    dispatch(getProfileArticlesThunk(userSlug));
  }, [dispatch]);


  return {
    articlesLoading: isLoading,
    articlesErrors: errors,
    allArticles: articles,
    getArticles: getArticles,
    articlesQuantity: articles.length,
    getProfileArticles: getProfileArticles,
    favoritesArticles: favorites,

  };
};
