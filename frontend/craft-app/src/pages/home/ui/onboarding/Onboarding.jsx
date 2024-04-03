import "./Onboarding.scss";
import bg from "../../../../components/shared/assets/img/ui/onboard-bg.png"
import lines from "../../../../components/shared/assets/img/ui/onboard-lines.png"
import vertical from "../../../../components/shared/assets/img/ui/onboard-vertical.png"

function Onboarding() {
  return (
    <section className="onboarding" id="onboarding">
      <img className="onboardBg" src={bg} alt="background" />
      
      <h2 className="onboarding__title">Как это работает?</h2>
      <div className="wrapper onboarding__wrapper">
      <img className="onboard__lines onboard__lines_horizon" src={lines} alt="background"/>
      <img className="onboardVertical" src={vertical} alt="background" srcset="" />
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
