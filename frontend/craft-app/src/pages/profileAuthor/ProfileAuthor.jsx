import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FileTextOutlined, SmileOutlined } from '@ant-design/icons';
import avatarDefault from "../../components/shared/assets/img/ui/avatar.svg";
import Button from '../../components/shared/ui/button/Button';
import { currentProfileThunk, getUserProfileThunk, subscribeUserThunk } from '../profile/thunks';
import './ProfileAuthor.scss'
import { profileSelector } from '../profile/selectors';
import { Navigate, useParams } from 'react-router-dom';
import { ArticlesGallery } from '../../components/ArticlesGallery/ArticlesGallery';
import { useArticles } from '../../hooks/useArticles';
import { ROUTE_NAMES } from '../../routes/routeNames';
import { Spin } from 'antd';

export const ProfileAuthor = () => {
  const { authorId } = useParams();
  
  const { articlesQuantity } = useArticles()
  const {errors, isLoading , profileAuthor, currentUser} = useSelector(profileSelector)
          const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser.id === authorId) {
      return <Navigate to={ROUTE_NAMES.PROFILE} />
    }
    dispatch(getUserProfileThunk(authorId))
        
  },[authorId, profileAuthor.is_subscribed])

  const handleSubscribe = () => {
    dispatch(subscribeUserThunk(profileAuthor.id)).then(() => dispatch(currentProfileThunk()))
  }
  
  console.log(profileAuthor);
  console.log(currentUser);
  
    
  return isLoading ? <Spin fullscreen/> : (
      <section className="profile">
        <div className="profile__wrapper">
          <div className="wrapper">
            <div className="profile__info">
              <div className="profile__user-card">
                <div className="user-card__img">
                  <img src={profileAuthor.avatar.endsWith('default.png')
                      ? avatarDefault : 
                      profileAuthor.avatar 
                  } alt="user avatar" />
                </div>
                <div className="user-card__info user-card__info_author">
                  <div className="user-card__info_author">
                    <div className="user-card__item">
                      <div className="item__number">
                        <h3>0</h3>
                        <SmileOutlined />
                      </div>
                      <p className="item__text">подписчиков</p>
                    </div>
                    <div className="user-card__item">
                      <div className="item__number">
                        <h3>{articlesQuantity}</h3>
                        <FileTextOutlined />
                      </div>
                      <p className="item__text">статей</p>
                    </div>
                  </div>
                  <Button
                    className="button button_colored user-card_btn"
                    onClick={handleSubscribe}
                  >
                    {currentUser.following.includes(profileAuthor.id) ? 'Отписаться' : 'Подписаться'}
                  </Button>
                </div>
              </div>
              <div className="user-info user-info_author">
                <h3>Имя</h3>
                <h2 className="user-info__name">{profileAuthor.first_name}</h2>
                <h3>Фамилия</h3>
                <h2 className="user-info__name">{profileAuthor.last_name}</h2>
                <h3>О себе</h3>
                <p className="story__text">{profileAuthor.bio}</p>
              </div>
            </div>
          </div>
          <h2>Статьи автора </h2>
          <ArticlesGallery searchValue={`?username=${profileAuthor.slug}`}/>
        </div>
  
      </section>
  )
}
