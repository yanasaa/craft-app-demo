from django.contrib import admin

from .models import UserProfile, Post

admin.site.site_header = 'Craftshare Management System'

@admin.register(UserProfile)
class ProfileAdmin(admin.ModelAdmin):
    """
    Админ-панель модели профиля
    """
    list_display = ('user', 'slug')
    list_display_links = ('user', 'slug')

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    """
    Админ-панель модели постов
    """
    list_display = ['title', 'slug', 'author', 'publish', 'status']
    list_filter = ['status', 'created', 'publish', 'author']
    search_fields = ['title', 'body']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'publish'
    ordering = ['status', 'publish']