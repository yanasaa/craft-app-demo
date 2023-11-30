from django.urls import path, include
from .views import UserProfileList, UserProfileDetail, PostListAPIView, \
    PostDetail

urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('userprofiles/', UserProfileList.as_view(), name='userprofile_list'),
    path('userprofile/<slug:slug>/', UserProfileDetail.as_view(),
         name='userprofile_detail'),
    path('posts/', PostListAPIView.as_view(), name='posts'),
    path('post/<slug:slug>', PostDetail.as_view(), name='post_detail'),
]
