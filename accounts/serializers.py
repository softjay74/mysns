from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import Image, Comment, Like, UserProfile
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)

class ProfileImgSerializer(serializers.ModelSerializer):
    
    class Meta : 
        model = UserProfile
        fields = (
            'user_id',
            'profileImage',
        )

class FeedUserSerializer(serializers.ModelSerializer):
    
    user_p = ProfileImgSerializer()
    
    class Meta :
        model = User
        fields = (
            'username',
            'user_p'
        )


class CommentSerializer(serializers.ModelSerializer):
    
    creator = FeedUserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = (
            'id',
            'message',
            'creator',
            'created'
        )

class LikeSerializer(serializers.ModelSerializer):
    
    creator = FeedUserSerializer(read_only=True)
    
    class Meta:
        model = Like
        fields = '__all__'


class ImageSerializer(TaggitSerializer, serializers.ModelSerializer):
    
    comment=CommentSerializer(read_only=True, many=True)
    creator = FeedUserSerializer(read_only=True)
    tags = TagListSerializerField(read_only=True)
    is_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Image
        fields = (
            'id',
            'file',
            'creator',
            'location',
            'caption',
            'created',
            'updated',
            'comment',
            'tags',
            'count_likes',
            'is_liked'
        )
    
    def get_is_liked(self, obj):
        if 'request' in self.context :
            request = self.context['request']
            try :
               Like.objects.get(creator__id=request.user.id, image__id=obj.id)
               return True
            except Like.DoesNotExist :
                return False
        else :
            return False

                
class UserSerializer(serializers.ModelSerializer) :

    images=ImageSerializer(many=True)
        
    class Meta :
        model = User
        fields = ( 
            'username', 
            'first_name', 
            'last_name',
            'images'
            )
      

class UserProfileSerializer(serializers.ModelSerializer):
    
    user=UserSerializer(read_only=True)
   
    class Meta : 
        model = UserProfile
        fields = (
            'user_id',
            'user',
            'profileImage',
            'description',
            'city',
            'website',
            'followersCount',
            'followingCount',
            'following'
        )


class ListUserSerializer(serializers.ModelSerializer):

    following = serializers.SerializerMethodField()

    class Meta :
        model = User
        fields = ( 
            'username', 
            'first_name', 
            'last_name',
            'following'
            )
    def get_following(self, obj):
        if 'request' in self.context:
            request = selft.context['request']        
            if obj in request.user.following.all():
                return True
        return False

class ListUserProfileSerializer(serializers.ModelSerializer):
    
    user=ListUserSerializer(read_only=True)
    following = serializers.SerializerMethodField()
    
    class Meta:
        model = UserProfile
        fields = (
            'user_id',
            'user',
            'profileImage'
            'following'
        )
    
    def get_following(self, obj):
        if 'request' in self.context:
            request = selft.context['request']        
            if obj in request.user.following.all():
                return True
        return False

class UpdateImageSerializer(TaggitSerializer, serializers.ModelSerializer):
     
    tags = TagListSerializerField()

    class Meta :
        model = Image
        fields =(
            'location',
            'caption',
            'tags'
        )