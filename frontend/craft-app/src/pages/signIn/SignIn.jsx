import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";

import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { UserOutlined } from "@ant-design/icons";
import axios from "../../api/axios";

import Button from "../../components/shared/ui/button/Button";
import { ROUTES } from "../../components/shared/consts/routes";
import StoreContext from "../../api/context/StoreProvider";
import "./Signin.scss";
import useAuth from "../../components/shared/hooks/useAuth";

// const END_POINT = "http://84.38.183.195/api/v1/account/login/";
const END_POINT = "account/login/";

const validationSchema = yup.object().shape({
  username: yup.string().required("Введите Ваш логин!"),
  password: yup.string().required("Введите Ваш пароль!"),
});

const SignIn = () =>
  /*{ setIsLoggedIn }*/
  {
    const { setIsLoggedIn } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState("");

    // useEffect(() => {
    //   userRef.current.focus();
    // }, []);

    useEffect(
      () => {
        setErrorMessage("");
      },
      [
        /*{?}*/
      ]
    );

    async function handleLogin(values) {
      console.log(values);
      const username = values.username;
      const password = values.password;
      try {
        const response = await axios.post(
          END_POINT,
          JSON.stringify({
            username,
            password,
          }),
          {
            headers: { "Content-type": "application/json; charset=UTF-8" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(response?.data));
        const accessToken = response?.data?.accessToken;
        setIsLoggedIn({ username, password, accessToken });
        // navigate(ROUTES.MAIN);
        navigate(location.state?.from?.pathname || ROUTES.MAIN, {
          replace: true,
        });
      } catch (err) {
        if (!err?.response) {
          setErrorMessage("No Server Response");
        } else if (err.response?.status === 400) {
          setErrorMessage("Missing Username or Password");
        } else if (err.response?.status === 401) {
          setErrorMessage("Unauthorized");
        } else {
          setErrorMessage("Login Failed");
        }
        // errRef.current.focus();
      }

      //   const options = {
      //     method: "post",
      //     headers: {
      //       "Content-type": "application/json; charset=UTF-8",
      //     },
      //     body: JSON.stringify({
      //       username,
      //       password,
      //     }),
      //   };

      //   fetch(END_POINT, options)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       if (data.access && data.refresh) {
      //         localStorage.setItem("ACCESS_TOKEN", data.access);
      //         console.log(data.refresh);
      //         localStorage.setItem("REFRESH_TOKEN", data.refresh);
      //         localStorage.setItem("USERNAME", values.username);
      //         setIsLoggedIn(true);

      //         navigate(ROUTES.MAIN);
      //       } else {
      //         setErrorMessage(data.detail);
      //       }
      //     });
    }

    return (
      <section className="sign-in">
        <div className=" wrapper sign-in__wrap">
          <div className="sign-in__preview">
            <h2>У нас много новинок</h2>
            <h2 className="sign-in__preview_text">
              Вдохновляйся работами мастеров.
              <br />
              Участики нашего комьюнити делятся полезной информацией и
              представляют свои работы.
            </h2>
          </div>
          <div className="sign-in__form">
            <h2>Мы рады вас видеть!</h2>
            <Formik
              validationSchema={validationSchema}
              initialValues={{ username: "", password: "" }}
              onSubmit={(values) => {
                handleLogin(values);
              }}
            >
              {({ errors, touched }) => (
                <Form
                  className="sif__wrapper"
                  // name="username"  label="Имя пользователя"
                  // rules={[ {     type: "username",        message: "The input is not valid Login!",     },  { required: true,    message: "Введите Ваш логин!",   }, ]}
                >
                  {errorMessage && (
                    <div
                      ref={errRef}
                      className="sif__error-msg"
                      aria-live="assertive"
                    >
                      {errorMessage}
                    </div>
                  )}
                  <div className="sif__register-link">
                    <span>Еще нет аккаунта на Craftshare?</span>
                    <a href="/" title="Регистрация пока недоступна :(">
                      Зарегистрироваться
                    </a>
                  </div>
                  <label /*htmlFor="username"*/>
                    Логин:
                    <Field
                      className="input sif__input"
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Введите имя пользователя"
                      name="username"
                      ref={userRef}

                      // rules={[ {     type: "username",        message: "The input is not valid Login!",     },  { required: true,    message: "Введите Ваш логин!",   }, ]}
                    />
                  </label>
                  {errors.username && touched.username && (
                    <div className="sif__error-msg">{errors.username}</div>
                  )}
                  <label>
                    Пароль:
                    <Field
                      className="input sif__input"
                      placeholder="Введите пароль"
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
