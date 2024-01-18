import { useState } from "react";
import Advantages from "./ui/advantages/Advantages";
import Articles from "./ui/articles/Articles";
import ContactUs from "./ui/contactUs/ContactUs";
import Hero from "./ui/hero/Hero";
import Onboarding from "./ui/onboarding/Onboarding";

function Home() {

  const [categoryId, setCategoryId] = useState(5)
  return (
    <>
      <Hero categoryId={categoryId} onClickCategory={show}/>
      <Advantages />
      <Articles categoryId={categoryId}/>
      <Onboarding />
      <ContactUs />
    </>
  );
}

function show(id) {
  console.log(id)
}
export default Home;
