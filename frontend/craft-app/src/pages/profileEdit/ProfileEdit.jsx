import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./ProfileEdit.scss";
import { ROUTES } from "../../components/shared/consts/routes";

const ProfileEdit = () => {
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  let navigate = useNavigate();
  function handleClick() {
    navigate(ROUTES.PROFILE);
    window.scrollTo(0, 0);
  }

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const getUserProfile = () => {
      fetch(`http://84.38.183.195/api/v1/userprofile/me/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setUserProfile(json);
        });
    };
    getUserProfile();
  }, []);

  return (
    <section className="profile">
      {console.log(userProfile)}
      <div className="profile__wrapper">
        <div className="wrapper">
          <div className="profile-edit__info">
            <div className="profile__user-card">
              <div className="user-card__img user-card__img_edit">
                <img
                  src={`http://84.38.183.195/${userProfile.avatar}`}
                  alt="user"
                />
                <div className="user-avatar__icons">
                  <EditOutlined />
                  <DeleteOutlined />
                </div>
              </div>
            </div>
            <div className="user-info__edit">
              <form className="profile-edit__form">
                <div className="user-info profile-edit">
                  {/* block for grid section */}
                  <div></div>
                  <h2 className="profile-edit__title">Настройки профиля</h2>
                  <p>Имя:</p>
                  <input
                    className="input input__profile-edit"
                    value={userProfile.first_name}
                  />
                  <p>Фамилия:</p>
                  <input
                    className="input input__profile-edit"
                    value={userProfile.last_name}
                  />
                  <p className="profile-edit__text">Email:</p>
                  <input
                    className="input input__profile-edit"
                    value={userProfile.email}
                  />
                  <p>О себе:</p>
                  <textarea
                    className="input input__profile-edit"
                    maxLength={300}
                    value={userProfile.bio}
                  ></textarea>
                  <p>Пол:</p>
                  <div>
                    <label className="radio__label" htmlFor="man">
                      <input
                        className="radio__profile-edit"
                        id="man"
                        type="radio"
                        name="gender"
                        value="М"
                        //   checked={value == "М" ? true : false}
                        //   onChange={changeValue}
                      />
                      М
                    </label>

                    <label className="radio__label" htmlFor="woman">
                      <input
                        className="radio__profile-edit"
                        id="woman"
                        type="radio"
                        name="gender"
                        value="Ж"
                        //   checked={value == "Ж" ? true : false}
                        //   onChange={changeValue}
                      />
                      Ж
                    </label>
                  </div>
                </div>
                <div className="profile-edit__buttons">
                  <button
                    className="button button_bordered pe__button"
                    onClick={handleClick}
                  >
                    Отмена
                  </button>
                  <button className="button button_colored pe__button">
                    Сохранить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileEdit;
