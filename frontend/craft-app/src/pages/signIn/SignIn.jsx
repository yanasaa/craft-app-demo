import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";

import { UserOutlined } from "@ant-design/icons";

import Button from "../../components/shared/ui/button/Button";

import "./Signin.scss";
import { ROUTES } from "../../components/shared/consts/routes";
import signin from "../../components/shared/assets/img/ui/signIn.png";
import { useState } from "react";

const END_POINT = "http://84.38.183.195/api/v1/account/login/";

const validationSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const SignIn = ({ setIsLoggedIn }) => {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("123");

  function handleLogin(values) {
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

    // message.success("Next step.");
  }

  return (
    <section className="sign-in__wrap">
      <div className="sign-in__image">
        <img src={signin} alt="signin" />
      </div>
      <div className="sign-in__form">
        <h2>Мы рады вас видеть!</h2>
        <Formik
          className="login-form"
          validationSchema={validationSchema}
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({ errors, touched }) => (
            <Form
              name="username"
              label="Имя пользователя"
              rules={[
                {
                  type: "username",
                  message: "The input is not valid Login!",
                },
                {
                  required: true,
                  message: "Введите Ваш логин!",
                },
              ]}
            >
              {/* <Input
                placeholder="hello"
                prefix={<UserOutlined className="site-form-item-icon" />}
              /> */}
              <label>Имя пользователя</label>
              <Field
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Имя пользователя"
                name="username"
              />
              {errors.email && touched.email && <div>{errors.email}</div>}

              <div padding={"10px"}>{errorMessage}</div>

              <label>Пароль</label>
              <Field
                // className="input"
                placeholder="Пароль"
                name="password"
                type="password"
              />
              {errors.password && touched.password && (
                <div>{errors.password}</div>
              )}

              <Button
                className="button button_colored"
                btnText="Войти"
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SignIn;
