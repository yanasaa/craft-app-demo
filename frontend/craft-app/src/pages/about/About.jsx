import {missions, results, values} from "./aboutInfo";
import TeamGallery from "./TeamGallery/TeamGallery"


export const About = () => {
  return (
    <section className="about">
      <div className="wrapper about__wrapper">
        <div className="about__missions">
          {missions.map((el) => (
            <div key={el.id}>
              <h2 className="mission__title">{el.title}</h2>
              <p className="mission__text">{el.text}</p>
            </div>))}
        </div>
        <div className="about__values">
          {values.map((el, i) => (
            <div key={i}>
              <h3 className="value__title">{el.title}</h3>
              <p className="value__text">{el.description}</p>
            </div>))}
        </div>
        <h2 className="mission__title">Наша команда и результаты</h2>
        <div className="about__values about__results">
          {results.map((el, i) => (
            <div key={i}>
              <p className="value__text">{el.text}</p>
            </div>))}
        </div>
        <div className="team">
          <TeamGallery />
        </div>
      </div>
    </section>
  );
};
