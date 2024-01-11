import DropdownContent from "../../components/shared/ui/dropdownContent/DropdownContent";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="wrapper footer__wrapper">
        <div className="footer__layout-4-columns layout-4-columns">
          <div className="home-links">
            <h3 className="footer__title">Главная</h3>
            <DropdownContent />
          </div>
          <div className="about-us-links">
            <h3 className="footer__title">О нас</h3>
          </div>
          <div className="contacts">
            <h3 className="footer__title">Контакты</h3>
            <a href="mailto:craft@gmail.com" className="footer__link">
              <span className="link-label">Email: </span>craft@gmail.com
            </a>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/?locale=ru_RU"
                className="social-link"
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon social-icon social-icon_facebook"></span>
              </a>
              <a
                href="https://www.instagram.com/"
                className="social-link"
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon social-icon social-icon_instagram"></span>
              </a>
              <a
                href="https://t.me/channelname"
                className="social-link"
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon social-icon social-icon_telegram"></span>
              </a>
              <a
                href="https://www.youtube.com/"
                className="social-link"
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon social-icon social-icon_youtube"></span>
              </a>
            </div>
          </div>
          <div className="mobile-app">
            <h3 className="footer__title">Скачать мобильное приложение</h3>
            <div className="mobile-app__button">
              <a
                href="https://support.google.com/googleplay/?hl=ru#topic=3364260"
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon mobile-app__icon"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
