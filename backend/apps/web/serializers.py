from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import UserProfile, Post


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class PostSerializer(ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'