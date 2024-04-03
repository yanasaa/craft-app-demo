import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { UserOutlined } from "@ant-design/icons";

import Button from "../../components/shared/ui/button/Button";
import { ROUTES } from "../../components/shared/consts/routes";
import "./Signin.scss";
import { useAuth } from "../../components/shared/hooks/useAuth";

const END_POINT = "http://84.38.183.195/api/v1/account/login/";

const validationSchema = yup.object().shape({
  username: yup.string().required("Введите Ваш логин!"),
  password: yup.string().required("Введите Ваш пароль!"),
});

const SignIn = () =>
  /*{ setIsLoggedIn }*/
  {
    const { setIsLoggedIn } = useAuth();

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin(values) {
      console.log(values);
      const username = values.username;
      const password = values.password;

      const options = {
        method: "post",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      };

      fetch(END_POINT, options)
        .then((response) => response.json())
        .then((data) => {
          if (data.access && data.refresh) {
            localStorage.setItem("ACCESS_TOKEN", data.access);
            console.log(data.refresh);
            localStorage.setItem("REFRESH_TOKEN", data.refresh);
            localStorage.setItem("USERNAME", values.username);
            setIsLoggedIn(true);

            navigate(ROUTES.MAIN);
          } else {
            setErrorMessage(data.detail);
          }
        });
    }

    return (
      <section className="sign-in">
        <div className=" wrapper sign-in__wrap">
          <div className="sign-in__preview">
            <h2 className="sign-in_preview__title">У нас много новинок</h2>
            <h2 className="sign-in__preview_text">
              Вдохновляйся работами мастеров.
              <br />
              Участики нашего комьюнити делятся полезной информацией и
              представляют свои работы.
            </h2>
          </div>
          <div className="sign-in__form">
            <h2 className="sign-in__form-title">Мы рады вас видеть!</h2>
            <Formik
              validationSchema={validationSchema}
              initialValues={{ username: "", password: "" }}
              onSubmit={(values) => {
                handleLogin(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="sif__wrapper">
                  {errorMessage && (
                    <div className="sif__error-msg" aria-live="assertive">
                      {errorMessage}
                    </div>
                  )}
                  <div className="sif__register-link">
                    <span>Еще нет аккаунта на Craftshare?</span>
                    <a href="/" title="Регистрация пока недоступна :(">
                      Зарегистрироваться
                    </a>
                  </div>
                  <label>
                    Логин:
                    <Field
                      className="input sif__input"
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="имя пользователя"
                      name="username"
                    />
                  </label>
                  {errors.username && touched.username && (
                    <div className="sif__error-msg">{errors.username}</div>
                  )}
                  <label>
                    Пароль:
                    <Field
                      className="input sif__input"
                      placeholder="пароль"
                      name="password"
                      type="password"
                    />
                  </label>
                  {errors.password && touched.password && (
                    <div className="sif__error-msg">{errors.password}</div>
                  )}

                  <Button
                    className="button button_colored sif__button"
                    btnText="Войти"
                    type="submit"
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    );
  };

export default SignIn;
