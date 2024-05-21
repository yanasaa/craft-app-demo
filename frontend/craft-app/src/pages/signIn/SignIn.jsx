import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Field } from "formik";
import Button from "../../components/shared/ui/button/Button";
import { ROUTE_NAMES } from "../../routes/routeNames";
import { loginSelector } from "./selectors";
import { initialValues } from "./initialValues";
import "./Signin.scss";
import { loginThunk } from "./thunks";
import { FormikField } from "../../components/FormikField/FormikField";

const validationSchema = yup.object().shape({
  username: yup.string().required("Введите Ваш логин!"),
  password: yup.string().required("Введите Ваш пароль!"),
});

export const SignIn = () => {
  const dispatch = useDispatch();
  const { isAuth, errors, isLoading } = useSelector(loginSelector);

  if (isAuth) return <Navigate to={ROUTE_NAMES.HOME} />;
  if (errors) console.log(errors);

  const handleSubmit = (values) => {
    dispatch(loginThunk(values));
  };

  return isAuth ? (
    <Navigate to={ROUTE_NAMES.HOME} />
  ) : (
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => {
              return (
                <div className="sif__wrapper">
                  <div className="sif__register-link">
                    <span>Еще нет аккаунта на Craftshare?</span>
                    <Link to={ROUTE_NAMES.SIGN_UP}>Зарегистрироваться</Link>
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
                  {errors && <div className="request_err_mes">{errors}</div>}
                  <Button
                    className="button button_colored sif__button"
                    type="submit"
                    disabled={isLoading || !formikProps.isValid}
                    onClick={formikProps.handleSubmit}
                  >
                    Войти
                  </Button>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
};
