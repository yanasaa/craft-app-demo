// import { createAsyncThunk } from "@reduxjs/toolkit";
// import ArticlesService from "../../../services/ArticlesService";

// export const singleArticleThunk = createAsyncThunk(
//   "singleArticle",
//   async (articleSlug, { rejectWithValue }) => {
//     try {
//       const response = await ArticlesService.getSingleArticle(articleSlug);
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e?.response?.data?.detail || e?.message);
//     }
//   }
// );

// export const setArticleLikeThunk = createAsyncThunk(
//   "setArticleLike",
//   async (articleId, { rejectWithValue }) => {
//     try {
//       const response = await ArticlesService.likeDislikeArticle(articleId);
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e?.response?.data?.detail || e?.message);
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";

const mockArticles = [
  {
    id: 1,
    slug: "pottery-basics",
    title: "Гончарное ремесло: основы работы с глиной",
    post_preview: "Как начать лепить первые изделия",
    body: `
      <h2>Гончарное дело</h2>
      <p>Гончарное ремесло — это работа с глиной и формирование изделий на круге.</p>
      <img src="https://picsum.photos/900/400" />
      <p>Сначала глину нужно хорошо размять и отцентрировать.</p>
    `,
    total_likes: 10,
    author: 1,
    author_username: "demo_user",
    preview: "https://picsum.photos/800/400",
    publish: "2026-01-01",
    likes: [1, 2],
    is_liked: false,
    is_favorited: false,
  },
  {
    id: 2,
    slug: "sewing-basics",
    title: "Шитьё для начинающих",
    post_preview: "Основы работы с тканью",
    body: `
      <h2>Шитьё</h2>
      <p>Шитьё — базовый навык ручного творчества.</p>
      <img src="https://picsum.photos/900/401" />
      <p>Начинайте с простых изделий: сумки, наволочки.</p>
    `,
    total_likes: 5,
    author: 2,
    author_username: "sewing_master",
    preview: "https://picsum.photos/800/401",
    publish: "2026-01-02",
    likes: [],
    is_liked: false,
    is_favorited: true,
  },
]

export const singleArticleThunk = createAsyncThunk(
  "singleArticle",
  async (slug) => {
    const article = mockArticles.find((a) => a.slug === slug);
    return article || mockArticles[0];
  }
);

export const setArticleLikeThunk = createAsyncThunk(
  "setArticleLike",
  async (articleId, { getState }) => {
    const state = getState();
    const article = state.singleArticle.article;

    const isLiked = (article.likes || []).includes(1);

    return {
      is_liked: !isLiked,
      likes: isLiked
        ? article.likes.filter((id) => id !== 1)
        : [...article.likes, 1],
      total_likes: isLiked
        ? article.total_likes - 1
        : article.total_likes + 1,
    };
  }
);
