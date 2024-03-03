import { useEffect, useState } from "react";
import s from "./HeadAnimation.module.scss";

const HeadAnimation = () => {
  const [accentWord, setAccentWord] = useState("best");
  // const accentWords = ["best", "your", "fun", "new"];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (accentWord === "best") {
        setAccentWord("your");
      } else if (accentWord === "your") {
        setAccentWord("fun");
      } else if (accentWord === "fun") {
        setAccentWord("new");
      } else if (accentWord === "new") {
        setAccentWord("best");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [accentWord]);

  return (
    <div className={s.animation}>
      <div className={`${s.accent} ${s[accentWord]}`}>
        <p>{accentWord}</p>
      </div>
    </div>
  );
};

export default HeadAnimation;
