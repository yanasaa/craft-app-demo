import Button from "../../../../components/shared/ui/button/Button";
import contactus from "../../../../components/shared/assets/img/ui/contactus.png";
import "./ContactUs.scss";
import Image from "../../../../components/shared/ui/image/Image";
import Input from "../../../../components/shared/ui/input/Input";

function ContactUS() {
  return (
    <section className="contact-us" id="contacts">
      <div className="wrapper contact-us__wrapper ">
        <div className="contact-us__content">
          <h2 className="contact-us__title">
            Напишите нам. <br />
            Мы будем рады вашему письму!
          </h2>
          <div className="contact-us__form">
            <form>
              <div className="layout-2-columns contact-us__line">
                <Input
                  disabled={true}
                  className="input contact-us__input"
                  type="text"
                  name="name"
                  placeholder="Имя"
                />
                <Input
                  disabled={true}
                  className="input contact-us__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <textarea
                disabled
                name="question"
                placeholder="Текст сообщения"
                className="input contact-us__line"
              ></textarea>
              <div className="contact-us__button ">
                <Button
                  onClick={(e) => e.preventDefault()}
                  btnText="Отправить"
                  type="submit"
                  className="button button_bordered footer__btn"
                  disabled
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="contact-us__image">
        <Image src={contactus} alt="some girl" />
      </div>
    </section>
  );
}

export default ContactUS;
