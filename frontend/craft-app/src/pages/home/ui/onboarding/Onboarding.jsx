import './Onboarding.scss';

function Onboarding() {
    return (
        <section className="onboarding" id="onboarding">
      <h2 className="onboarding__title">Как это работает?</h2>
      <div className="wrapper onboarding__wrapper layout-3-columns">
        <div className="onboarding__text">размести статью</div>
        <div></div>
        <div className="onboarding__text">собирай аудиторию</div>

        <div></div>
        <div className="onboarding__text">делись опытом</div>
        <div></div>
        <div className="onboarding__text">собирай лайки</div>
        <div></div>
        <div></div>
      </div>
    </section>
    )
}

export default Onboarding;