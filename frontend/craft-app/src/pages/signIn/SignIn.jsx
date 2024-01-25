import { useState } from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../components/shared/consts/routes";

import Button from "../../components/shared/ui/button/Button";

import "./Signin.scss";
import signin from "../../components/shared/assets/img/ui/signIn.png";

const END_POINT = "http://84.38.183.195/api/v1/account/login/";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (values) => {
    // navigate(ROUTES.MAIN);
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
        } else {
          setErrorMessage(data.detail);
          console.log(data);
        }
      });

    // navigate(ROUTES.MAIN);
  };

  return (
    <section className="sign-in__wrap">
      <div className="sign-in__image">
        <img src={signin} alt="signin" />
      </div>
      <div className="sign-in__form">
        <h2>Авторизация</h2>
        <div>
          <Input
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Input.Password
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div padding={"10px"}>{errorMessage}</div>
        <div>
          <Button type="primary" onClick={handleLogin}>
            Войти
          </Button>
          <Button
            className="button button_colored"
            btnText="Войти"
            type="submit"
            onClick={handleLogin}
          ></Button>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
