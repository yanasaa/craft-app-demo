import { useDispatch, useSelector } from "react-redux";
import { articlesSelector } from "../components/ArticlesGallery/selectors";
import { getArticlesThunk } from "../components/ArticlesGallery/thunks";
import { useCallback } from "react";

export const useArticles = () => {
  const { articles, isLoading, errors } = useSelector(articlesSelector);
  const dispatch = useDispatch();

  const getArticles = useCallback(() => {
    dispatch(getArticlesThunk());
  }, [dispatch]);


  return {
    articlesLoading: isLoading,
    articlesErrors: errors,
    allArticles: articles,
    getArticles: getArticles,

  };
};
