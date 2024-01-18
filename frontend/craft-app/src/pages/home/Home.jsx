import { useState } from "react";
import Advantages from "./ui/advantages/Advantages";
import Articles from "./ui/articles/Articles";
import ContactUs from "./ui/contactUs/ContactUs";
import Hero from "./ui/hero/Hero";
import Onboarding from "./ui/onboarding/Onboarding";

function Home() {
  const [categoryId, setCategoryId] = useState(0);
  return (
    <>
      <Hero
        categoryId={categoryId}
        onClickCategory={(id) => {
          setCategoryId(id);
          window.scrollTo(0, 2000);
        }}
      />
      <Advantages />
      <Articles
        categoryId={categoryId}
        onClickCategory={(id) => setCategoryId(id)}
      />
      <Onboarding />
      <ContactUs />
    </>
  );
}

export default Home;
