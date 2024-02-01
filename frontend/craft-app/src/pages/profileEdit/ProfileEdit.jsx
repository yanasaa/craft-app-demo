import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./ProfileEdit.scss";
import { ROUTES } from "../../components/shared/consts/routes";

const ProfileEdit = () => {
  let navigate = useNavigate();
  function handleCancelClick() {
    navigate(ROUTES.PROFILE);
    window.scrollTo(0, 0);
  }

  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const [userProfile, setUserProfile] = useState({});

  const [selectedFile, setSelectedFile] = useState();
  const filePicker = useRef(null);
  function handleChange(e) {
    setSelectedFile(e.target.files[0]);
  }
  function handlePick() {
    filePicker.current.click();
  }

  const initialData = {
    slug: userProfile.slug,
    email: userProfile.email || "",
    first_name: userProfile.first_name || "",
    last_name: userProfile.last_name || "",
    gender: userProfile.gender,
    bio: userProfile.bio || "",
    avatar: userProfile.avatar,
    user: userProfile.user,
  };

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
  function handle(e) {
    const newData = { ...userProfile };

    newData[e.target.id] = e.target.value || "";
    setUserProfile(newData);
  }
  const url = "http://84.38.183.195";

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", userProfile.email || initialData.email);
    formData.append("first_name", userProfile.first_name);
    formData.append("last_name", userProfile.last_name);
    formData.append("bio", userProfile.bio);
    formData.append("user", userProfile.user);
    formData.append("gender", userProfile.gender);
    selectedFile && formData.append("avatar", selectedFile);

    const res = await fetch(`${url}/api/v1/userprofile/${userProfile.id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: formData,
    });
    const mydata = await res.json();
    console.log(mydata);
    if (
      mydata.email &&
      mydata.email[0] === "Введите правильный адрес электронной почты."
    ) {
      alert(mydata.email[0]);
      return;
    }
    setUserProfile(initialData);
    window.scrollTo(0, 0);
    navigate(ROUTES.PROFILE);
  };

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <div className="wrapper">
          <div className="profile-edit__info">
            <div className="profile__user-card">
              <div className="user-card__img user-card__img_edit">
                {selectedFile ? (
                  <>
                    <p>{selectedFile.name}</p>
                    <p>Фото загружено</p>
                  </>
                ) : (
                  <img
                    src={`http://84.38.183.195/${userProfile.avatar}`}
                    alt="user"
                  />
                )}
                {/* "/media/images/avatars/default.png" */}
                <div className="user-avatar__icons">
                  <EditOutlined onClick={handlePick} />

                  {selectedFile && (
                    <DeleteOutlined
                      title="Отменить изменения"
                      onClick={() => setSelectedFile()}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="user-info__edit">
              <form
                onSubmit={(e) => handleUpload(e)}
                className="profile-edit__form"
              >
                <div className="user-info profile-edit">
                  <div>
                    <input
                      className="hidden"
                      type="file"
                      id="preview"
                      ref={filePicker}
                      onChange={handleChange}
                      accept="image/* .png, .jpg, .jpeg"
                    />
                  </div>
                  <h2 className="profile-edit__title">Настройки профиля</h2>
                  <p>Имя:</p>
                  <input
                    className="input input__profile-edit"
                    value={userProfile.first_name}
                    id="first_name"
                    onChange={(event) => handle(event)}
                  />
                  <p>Фамилия:</p>
                  <input
                    className="input input__profile-edit"
                    value={userProfile.last_name}
                    id="last_name"
                    onChange={(event) => handle(event)}
                  />
                  <p className="profile-edit__text">Email:</p>
                  <input
                    className="input input__profile-edit"
                    value={userProfile.email}
                    id="email"
                    onChange={(event) => handle(event)}
                  />
                  <p>О себе:</p>
                  <textarea
                    className="input input__profile-edit"
                    maxLength={300}
                    value={userProfile.bio}
                    id="bio"
                    onChange={(event) => handle(event)}
                  ></textarea>
                  <p>Пол:</p>
                  <div>
                    <label className="radio__label" htmlFor="man">
                      <input
                        className="radio__profile-edit"
                        id="gender"
                        type="radio"
                        name="radio"
                        value="M"
                        checked={userProfile.gender === "M"}
                        onChange={(event) => handle(event)}
                      />
                      М
                    </label>

                    <label className="radio__label" htmlFor="woman">
                      <input
                        className="radio__profile-edit"
                        id="gender"
                        type="radio"
                        name="radio"
                        value="F"
                        checked={userProfile.gender === "F"}
                        onChange={(event) => handle(event)}
                      />
                      Ж
                    </label>
                  </div>
                </div>
                <div className="profile-edit__buttons">
                  <button
                    className="button button_bordered"
                    onClick={handleCancelClick}
                  >
                    Отмена
                  </button>
                  <button className="button button_colored">Сохранить</button>
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
