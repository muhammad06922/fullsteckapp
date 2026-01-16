from rest_framework import serializers
from .models import Note
from django.contrib.auth.models import User






class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}


    def create(self, validated_data):
        password = validated_data.pop('password')
        print(validated_data)
        user =User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user





class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields = ('id','title','content','created','author')
        extra_kwargs ={'author':{'required':True}}