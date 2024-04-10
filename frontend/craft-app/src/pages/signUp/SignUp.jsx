import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Field } from "formik";
import Button from "../../components/shared/ui/button/Button";
import { ROUTE_NAMES } from "../../routes/routeNames";
import { initialValues } from "./initialValues";
import "./signUp.scss";
import { FormikField } from "../../components/FormikField/FormikField";
import AuthService from "../../services/AuthService";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
  username: yup.string().required("Введите Ваш логин!"),
  password: yup.string().required("Введите Ваш пароль!"),
});

export const SignUp = () => {

  const handleSubmit = (values) => {
    console.log(values);
    AuthService.signUp(values).then((data) => console.log(data));
  };

 

  return (
    <section className="sign-in">
      <div className=" wrapper sign-in__wrap sign-up__wrap">
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => {
              return (
                <div className="sif__wrapper">
                  <div className="sif__register-link">
                    <span>Уже есть аккаунт на Craftshare?</span>
                    <Link to={ROUTE_NAMES.SIGN_IN}>Войти</Link>
                  </div>

                  <Field
                    className="input sif__input"
                    type="text"
                    placeholder="имя пользователя"
                    name="username"
                    component={FormikField}
                    label="Логин: "
                  />

                  <Field
                    className="input sif__input"
                    placeholder="пароль"
                    name="password"
                    type="password"
                    label="Пароль:  "
                    component={FormikField}
                  />
                  {/* <div>{errors}</div> */}
                  <Button
                    className="button button_colored sif__button"
                    type="submit"
                    disabled={!formikProps.isValid}
                    onClick={formikProps.handleSubmit}
                  >Зарегистрироваться</Button>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
};

