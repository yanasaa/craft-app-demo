import "./Onboarding.scss";

function Onboarding() {
  return (
    <section className="onboarding" id="onboarding">
      <h2 className="onboarding__title">Как это работает?</h2>
      <div className="wrapper onboarding__wrapper">
        <div className="onboarding__text onboarding__text_article">
          размести статью
        </div>
        <div className="onboarding__text onboarding__text_audience">
          собирай аудиторию
        </div>
        <div className="onboarding__text onboarding__text_experience">
          делись опытом
        </div>
        <div className="onboarding__text onboarding__text_likes">
          собирай лайки
        </div>
      </div>
    </section>
  );
}

export default Onboarding;
