import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  // Button,
  Checkbox,
  // Form,
  Input,
} from "antd";

import Button from "../../components/shared/ui/button/Button";
// import Input from "../../components/shared/ui/input/Input";
// import LoginForm from "./LoginForm";
// import "./SignIn.scss";
import { ROUTES } from "../../components/shared/consts/routes";
// import signin from "../../components/shared/assets/img/ui/signIn.png";

// function validateEmail(value) {
//   if (!value) {
//     return "Required";
//   } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
//     return "Некорректный адрес почты";
//   }
// }

// function validatePassword(value) {
//   if (!value) {
//     return "Required";
//   }
// }

const END_POINT = "http://84.38.183.195/api/v1/account/login/";
const onFinish = (values) => {};

// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

const validationSchema = yup.object().shape({
  username: yup.string().required("Required"),
  // email: yup.string().required("Required").email("Некорректный адрес почты"),
  password: yup.string().required("Required"),
});

const SignIn = () => {
  let navigate = useNavigate();

  function handleLogin(values) {
    console.log(values);
    navigate(ROUTES.MAIN);
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
        if (data.access) {
          localStorage.setItem("ACCESS_TOKEN", data.access);
        } else {
          console.log(data);
        }
      });

    // message.success("Next step.");
  }

  return (
    <section className="sign-in__wrap">
      <div className="sign-in__image">
        {/* <img src={signin} alt="signin" /> */}
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
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          {({ errors, touched }) => (
            <Form
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Введите Ваш email!",
                },
              ]}
            >
              {/* <Input
                placeholder="hello"
                prefix={<UserOutlined className="site-form-item-icon" />}
              /> */}
              {/* <label>Электронная почта</label> */}
              <Field
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Ваш email"
                // className="input"
                name="username"
                // validate={validateEmail}
              />
              {errors.email && touched.email && <div>{errors.email}</div>}
              {/* <Input className="input" /> */}

              <label>Пароль</label>
              <Field
                className="input"
                name="password"
                type="password"
                // validate={validatePassword}
              />
              {errors.password && touched.password && (
                <div>{errors.password}</div>
              )}

              <Button
                className="button button_colored"
                btnText="Войти"
                type="submit"
                // type="button"
              />
            </Form>
          )}
        </Formik>
      </div>
      {/* <LoginForm /> */}
    </section>
  );
};

export default SignIn;