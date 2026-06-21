import {missions, results, values} from "./aboutInfo";
import TeamGallery from "./TeamGallery/TeamGallery"
import "./About.scss"


export const About = () => {
  return (
    <section className="about">
      <div className="about__wrapper">
        <div className="about__missions">
          {missions.map((el) => (
            <div key={el.id} className="mission">
              <h2 className="mission__title">{el.title}</h2>
              <p className="about__text">{el.text}</p>
            </div>))}
        </div>
        <div className="about__values">
          {values.map((el, i) => (
            <div key={i}>
              <img className="about__icon" src={el.icon} alt="icon" />
              <h3 className="value__title">{el.title}</h3>
              <p className="about__text">{el.description}</p>
            </div>))}
        </div>
        <h2 className="mission__title">Наша команда и результаты</h2>
        <div className="about__values about__results">
          {results.map((el, i) => (
            <div key={i}>
              <img className="about__icon" src={el.icon} alt="icon" />
              <p className="about__text">{el.text}</p>
            </div>))}
        </div>
        <div className="team">
          <TeamGallery />
        </div>
      </div>
    </section>
  );
};
