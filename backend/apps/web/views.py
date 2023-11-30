from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView

from .models import UserProfile, Post
from .serializers import UserProfileSerializer, PostSerializer


class UserProfileList(generics.ListCreateAPIView):
    """
    Получение всех профилей пользователей
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Вью для получения профиля по slug=username
    """
    serializer_class = UserProfileSerializer
    lookup_url_kwarg = 'slug'

    def get_queryset(self):
        return UserProfile.objects.filter(slug=self.kwargs[self.lookup_url_kwarg])

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(
            queryset,
            slug=self.kwargs[self.lookup_url_kwarg]
        )
        self.check_object_permissions(self.request, obj)
        return obj

class PostListAPIView(ListAPIView):
    name = 'Список постов'
    description = 'Информация обо всех постах, размещенных на платформе'
    serializer_class = PostSerializer
    filter_backends = (SearchFilter, OrderingFilter,)
    search_fields = ('title', 'author__username',)
    ordering = 'publish'

    def get_queryset(self):
        return Post.objects.all()


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    lookup_url_kwarg = 'slug'

    def get_queryset(self):
        return Post.objects.filter(slug=self.kwargs[self.lookup_url_kwarg])

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(
            queryset,
            slug=self.kwargs[self.lookup_url_kwarg]
        )
        self.check_object_permissions(self.request, obj)
        return obj