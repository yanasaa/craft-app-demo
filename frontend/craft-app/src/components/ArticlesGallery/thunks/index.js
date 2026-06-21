// import { createAsyncThunk } from "@reduxjs/toolkit";
// import ArticlesService from "../../../services/ArticlesService";

// export const getArticlesThunk = createAsyncThunk(
//   "getArticles",
//   async (searchValue, { rejectWithValue }) => {
//     try {
//       const response = await ArticlesService.getArticles(searchValue);
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e?.response?.data?.detail || e?.message);
//     }
//   }
// );
// export const getArticlesByCategoryThunk = createAsyncThunk(
//   "getArticlesByCategory",
//   async (catigoryId, { rejectWithValue }) => {
//     try {
//       const response = await ArticlesService.getArticlesByCategory(catigoryId);
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e?.response?.data?.detail || e?.message);
//     }
//   }
// );

// export const getArticlesBySearchThunk = createAsyncThunk(
//   "getArticlesBySearch",
//   async (searchValue, { rejectWithValue }) => {
//     try {
//       const response = await ArticlesService.getArticlesBySearch(searchValue);
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e?.response?.data?.detail || e?.message);
//     }
//   }
// );

// export const getProfileArticlesThunk = createAsyncThunk(
//   "getProfileArticles",
//   async (userSlug, { rejectWithValue }) => {
//     try {
//       const response = await ArticlesService.getProfileArticles(userSlug);
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e?.response?.data?.detail || e?.message);
//     }
//   }
// );

// export const getAllTagsThunk = createAsyncThunk(
//   "getTags",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await ArticlesService.getAllTags();
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e?.response?.data?.detail || e?.message);
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";

/* =======================
   MOCK DATA
======================= */

const mockArticles = [
  {
    id: 1,
    slug: "pottery-basics",
    title: "Гончарное ремесло: основы работы с глиной",
    post_preview: "Как начать лепить первые изделия из глины",
    body: "Подробный гайд по выбору глины, центровке и формированию простых изделий на гончарном круге.",
    total_likes: 18,
    author_username: "demo_user",
    preview: "https://picsum.photos/300/200?1",
    publish: true,
  },
  {
    id: 2,
    slug: "pottery-vases",
    title: "Создание ваз на гончарном круге",
    post_preview: "Техника вытягивания высоких форм",
    body: "Разбираем, как формировать стенки и контролировать толщину изделия.",
    total_likes: 11,
    author_username: "pottery_master",
    preview: "https://picsum.photos/300/200?2",
    publish: true,
  },
  {
    id: 3,
    slug: "sewing-basics",
    title: "Шитьё для начинающих",
    post_preview: "Первые шаги в работе с тканью",
    body: "Как выбрать ткань, нитки и простую выкройку для старта.",
    total_likes: 24,
    author_username: "sewing_anna",
    preview: "https://picsum.photos/300/200?3",
    publish: true,
  },
  {
    id: 4,
    slug: "sewing-bag",
    title: "Как сшить простую сумку",
    post_preview: "Практический проект для новичков",
    body: "Пошаговое руководство по созданию тканевой сумки без подкладки.",
    total_likes: 15,
    author_username: "sewing_anna",
    preview: "https://picsum.photos/300/200?4",
    publish: true,
  },
  {
    id: 5,
    slug: "wood-carving-intro",
    title: "Резьба по дереву: первые инструменты",
    post_preview: "Что нужно для старта в резьбе",
    body: "Обзор ножей, стамесок и техники безопасности при работе с деревом.",
    total_likes: 9,
    author_username: "wood_master",
    preview: "https://picsum.photos/300/200?5",
    publish: true,
  },
  {
    id: 6,
    slug: "wood-shelf",
    title: "Создание деревянной полки своими руками",
    post_preview: "Простой DIY проект",
    body: "Как собрать настенную полку из досок и обработать поверхность.",
    total_likes: 21,
    author_username: "wood_master",
    preview: "https://picsum.photos/300/200?6",
    publish: true,
  },
  {
    id: 7,
    slug: "blacksmith-basics",
    title: "Кузнечное дело: основы",
    post_preview: "Огонь, металл и первые изделия",
    body: "Введение в кузнечное дело: инструменты, печь и базовые операции.",
    total_likes: 30,
    author_username: "forge_master",
    preview: "https://picsum.photos/300/200?7",
    publish: true,
  },
  {
    id: 8,
    slug: "metal-hook",
    title: "Кованый крюк своими руками",
    post_preview: "Простой проект для начинающих кузнецов",
    body: "Пошаговое создание декоративного металлического крюка.",
    total_likes: 13,
    author_username: "forge_master",
    preview: "https://picsum.photos/300/200?8",
    publish: true,
  },
  {
    id: 9,
    slug: "embroidery-basics",
    title: "Вышивка для начинающих",
    post_preview: "Игла, нитки и первые стежки",
    body: "Основные виды стежков и простые узоры для старта.",
    total_likes: 19,
    author_username: "sewing_anna",
    preview: "https://picsum.photos/300/200?9",
    publish: true,
  },
  {
    id: 10,
    slug: "clay-cups",
    title: "Глиняные кружки ручной работы",
    post_preview: "Создание посуды от формы до обжига",
    body: "Полный процесс изготовления кружек: лепка, сушка, обжиг и глазурь.",
    total_likes: 27,
    author_username: "demo_user",
    preview: "https://picsum.photos/300/200?10",
    publish: true,
  },
];

const mockTags = [
  { id: 1, name: "Гончарное дело" },
  { id: 2, name: "Керамика" },
  { id: 3, name: "Шитьё" },
  { id: 4, name: "Вышивка" },
  { id: 5, name: "Резьба по дереву" },
  { id: 6, name: "Столярка" },
  { id: 7, name: "Кузнечное дело" },
  { id: 8, name: "Металл" },
  { id: 9, name: "DIY" },
  { id: 10, name: "Ручная работа" },
  { id: 11, name: "Мастерская" },
  { id: 12, name: "Искусство" },
];

/* =======================
   THUNKS (DEMO MODE)
======================= */

export const getArticlesThunk = createAsyncThunk(
  "getArticles",
  async () => {
    return mockArticles;
  }
);

export const getArticlesByCategoryThunk = createAsyncThunk(
  "getArticlesByCategory",
  async (categoryId) => {
    return mockArticles.filter((a) => a.id % categoryId !== 0);
  }
);

export const getArticlesBySearchThunk = createAsyncThunk(
  "getArticlesBySearch",
  async (searchValue) => {
    return mockArticles.filter((a) =>
      a.title.toLowerCase().includes(searchValue?.toLowerCase() || "")
    );
  }
);

export const getProfileArticlesThunk = createAsyncThunk(
  "getProfileArticles",
  async (userSlug) => {
    return mockArticles.filter(
      (a) => a.author_username === userSlug
    );
  }
);

export const getAllTagsThunk = createAsyncThunk(
  "getTags",
  async () => {
    return mockTags;
  }
);
