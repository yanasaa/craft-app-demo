import { useState } from "react";
import Advantages from "./ui/advantages/Advantages";
import Articles from "./ui/articles/Articles";
import ContactUs from "./ui/contactUs/ContactUs";
import Hero from "./ui/hero/Hero";
import Onboarding from "./ui/onboarding/Onboarding";

function Home() {
  const [categoryId, setCategoryId] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Hero
        categoryId={categoryId}
        onClickCategory={(id) => {
          setCategoryId(id);
          window.scrollTo(0, 2150);
        }}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Advantages />
      <Articles
        categoryId={categoryId}
        onClickCategory={(id) => setCategoryId(id)}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Onboarding />
      <ContactUs />
    </>
  );
}

export default Home;
