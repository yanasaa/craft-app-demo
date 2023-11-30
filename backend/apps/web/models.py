from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.urls import reverse
from django.utils import timezone

from conf.utils import unique_slugify


class UserProfile(models.Model):
    """Модель профиля пользователя"""
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                verbose_name='Логин пользователя')
    slug = models.SlugField('URL профиля', max_length=255, blank=True,
                            unique=True, null=True)
    email = models.EmailField('Почта', unique=True, max_length=200, null=True)
    first_name = models.CharField('Имя', max_length=100, null=True)
    last_name = models.CharField('Фамилия', max_length=100, null=True)
    gender = models.CharField('Пол', max_length=1,
                              choices=[('M', 'Male'), ('F', 'Female')],
                              null=True)
    bio = models.TextField('Информация о себе', max_length=500, blank=True,
                           null=True)
    avatar = models.ImageField(
        verbose_name='Аватар',
        upload_to='images/avatars/',
        default='images/avatars/default.png',
        blank=True,
        validators=[
            FileExtensionValidator(allowed_extensions=('png', 'jpg', 'jpeg'))])

    class Meta:
        ordering = ('user',)
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

    def save(self, *args, **kwargs):
        """
        Сохранение полей модели при их отсутствии заполнения
        """
        if not self.slug:
            self.slug = unique_slugify(self, self.user.username)
        super().save(*args, **kwargs)

    def __str__(self):
        """
        Возвращение строки
        """
        return self.user.username

    def get_absolute_url(self):
        """
        Ссылка на профиль
        """
        return reverse('profile_detail', kwargs={'slug': self.slug})


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()


class Post(models.Model):
    """
    Модель поста
    """
    class Status(models.TextChoices):
        """
        Статус публикации для отображения
        """
        DRAFT = 'DF', 'Draft'
        PUBLISHED = 'PB', 'Published'


    title = models.CharField('Заголовок публикации', max_length=250)
    slug = models.SlugField('Слаг', max_length=250, unique=True)
    craft_type = models.CharField('Тип ремесла', max_length=250)
    author = models.ForeignKey(User,
                               on_delete=models.CASCADE,
                               related_name='blog_posts')
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=2,
                              choices=Status.choices,
                              default=Status.PUBLISHED)

    class Meta:
        ordering = ['-publish']
        verbose_name = 'Публикация'
        verbose_name_plural = 'Публикации'

    indexes = [
        models.Index(fields=['-publish']),
    ]

    def __str__(self):
        return self.title