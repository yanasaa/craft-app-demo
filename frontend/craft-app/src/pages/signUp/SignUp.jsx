import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Field } from "formik";
import { Tooltip } from "antd";
import Button from "../../components/shared/ui/button/Button";
import { ROUTE_NAMES } from "../../routes/routeNames";
import { initialValues } from "./initialValues";
import { FormikField } from "../../components/FormikField/FormikField";
import { loginSelector } from "../signIn/selectors";
import { signUpThunk } from "./thunks";
import { LoadingOutlined } from '@ant-design/icons';
import "./signUp.scss";


const validationSchema = yup.object().shape({
  username: yup.string().required("Вы не ввели имя пользователя"),
  password: yup.string().required("Вы не ввели пароль"),
});

export const SignUp = () => {
   const { isAuth, errors, isLoading, signUpStatus } = useSelector(loginSelector);

  if (errors) console.log(errors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(signUpThunk(values)).then((data) => {
      if(signUpStatus && data.meta.requestStatus === "fulfilled") {
        navigate(ROUTE_NAMES.SIGN_IN)
      }
    })
  };

  return isAuth ? (
    <Navigate to={ROUTE_NAMES.HOME} />
  ) : (
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
                    <Tooltip title="Перейти к авторизации" color={'#ad2e95'} mouseEnterDelay={1} arrow={false}>
                      <Link to={ROUTE_NAMES.SIGN_IN}>Войти</Link>
                    </Tooltip>
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
                   {isLoading ? <LoadingOutlined/> : "Зарегистрироваться"} 
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
