from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from main_page.models import *


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
          model = Profile
          fields = ['avatar', 'user']
    def update(self, instance, validated_data):
        instance.avatar = validated_data.get('style', instance.avatar)