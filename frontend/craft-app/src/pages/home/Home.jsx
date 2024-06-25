import { useState } from "react";
import Advantages from "./ui/advantages/Advantages";
import Articles from "./ui/articles/Articles";
import ContactUs from "./ui/contactUs/ContactUs";
import Hero from "./ui/hero/Hero";
import Onboarding from "./ui/onboarding/Onboarding";

export const Home = () => {
  const [categoryId, setCategoryId] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const articlesSection = document.getElementById('articles')
  const scrollToArticles = () => {
    articlesSection.scrollIntoView()
  }
  return (
    <>
      <Hero
        categoryId={categoryId}
        onClickCategory={(id) => {
          setCategoryId(id);
        }}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setCategoryId={setCategoryId}
        scrollToArticles={scrollToArticles}
      />
      <Advantages />
      <Articles
        categoryId={categoryId}
        onClickCategory={(id) => setCategoryId(id)}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setCategoryId={setCategoryId}
      />
      <Onboarding />
      <ContactUs />
    </>
  );
};
