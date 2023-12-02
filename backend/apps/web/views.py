from django.shortcuts import get_object_or_404
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, \
    CreateAPIView
from rest_framework.permissions import IsAuthenticated

from .models import UserProfile, Post
from .permissions import IsOwnerOrReadOnly
from .serializers import UserProfileSerializer, PostSerializer


class UserProfileList(ListAPIView):
    """
    Получение всех профилей пользователей
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileDetail(RetrieveUpdateAPIView):
    """
    Вью для получения и обновления профиля по slug=username
    """
    serializer_class = UserProfileSerializer
    lookup_url_kwarg = 'slug'
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return UserProfile.objects.filter(
            slug=self.kwargs[self.lookup_url_kwarg])

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(queryset,
                                slug=self.kwargs[self.lookup_url_kwarg])
        self.check_object_permissions(self.request, obj)
        return obj

    def perform_update(self, serializer):
        # Проверяем, что пользователь обновляет свой собственный профиль
        if self.request.user != serializer.instance.user:
            self.check_object_permissions(self.request, serializer.instance)
            serializer.save()
        else:
            super().perform_update(serializer)


class PostCreateView(CreateAPIView):
    name = 'Создать пост'
    serializer_class = PostSerializer
    # authentication_classes = (BasicAuthentication,)
    queryset = Post.objects.all()

    def perform_create(self, serializer):
        serializer.save(authors=(self.request.user,))


class PostListAPIView(ListAPIView):
    name = 'Список постов'
    description = 'Информация обо всех постах, размещенных на платформе'
    serializer_class = PostSerializer
    filter_backends = (SearchFilter, OrderingFilter,)
    search_fields = ('title', 'author__username',)
    ordering = 'publish'

    def get_queryset(self):
        return Post.objects.all()


class PostDetail(RetrieveUpdateAPIView):
    name = 'Пост'
    description = 'Получение поста по slug, переданному в URL'
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
