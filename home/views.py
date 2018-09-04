#from django.shortcuts import render
#from django.http import HttpResponse
# Create your views here.

from django.views.generic import TemplateView
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from accounts.models import UserProfile, MyPost, Image, Like, Comment

from rest_framework import status
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


#from home.forms import HomeForm

from accounts.serializers import (
    ImageSerializer, UpdateImageSerializer, 
    CommentSerializer, UserSerializer, UserProfileSerializer, 
    ListUserSerializer, ListUserProfileSerializer, LikeSerializer
)    

from notification.views import *
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView




class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class Homeview(TemplateView):
    template_name="home/home.html"

    def get(self, request):
        #form = HomeForm()
        posts = MyPost.objects.all().order_by('-created')
        users = User.objects.all()
        args = {'posts': posts, 'users': users }
        return render(request, self.template_name, args)

class FeedView(APIView):

    permission_classes = (AllowAny,)

    """
    def get(self, request):
        user = request.user
        FollowingUser = UserProfile.objects.values('following').filter(id=request.user.id) # 이시점에 쿼리와 정렬을 같이 해서 한꺼번에 출력하는것이 맞는듯.. 쿼리 만들기
        image_list =[]
        for Following in FollowingUser :

            user_images = Image.objects.all().filter(creator=Following['following']) 
            
            for user_image in user_images :
                image_list.append(user_image)  # 배열에 넣는것은 별로 인듯
                
                #print(user_image.creator, user_image.file)

        sorted_list = sorted(image_list, key=lambda image: image.created, reverse=True)  #이놈을 다시 정렬 하는것으 더 별로 인듯...
        serializer = ImageSerializer(sorted_list, many="True")
        #print(image_list)
        return Response(serializer.data)
     """   

    def get(self, request):
            #user = request.user
            #FollowingUser = UserProfile.objects.values('following').filter(id=request.user.id) # 이시점에 쿼리와 정렬을 같이 해서 한꺼번에 출력하는것이 맞는듯.. 쿼리 만들기
        image_list =[]
        #for Following in FollowingUser :

        user_images = Image.objects.all()
            
        for user_image in user_images :
            image_list.append(user_image)  # 배열에 넣는것은 별로 인듯
            
            #print(user_image.creator, user_image.file)

        sorted_list = sorted(image_list, key=lambda image: image.created, reverse=True)  #이놈을 다시 정렬 하는것으 더 별로 인듯...
        serializer = ImageSerializer(sorted_list, many="True", context={'request':request})
        #print(image_list)
        return Response(serializer.data)


    def post(self, request, format=None):

        user=request.user

        serializer=ImageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(creator=user)
            
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else :
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class LikeImage(APIView):       
        
    def get(self, request, image_id, format=None):
        
        user=request.user

        try: 
            get_image = Image.objects.get(id=image_id)
        except : 
            return Response(status=status.HTTP_204_NO_CONTENT)   

        try :
            existed_like= Like.objects.get(
                creator=user,
                image = get_image
            )
            
            return Response(status=status.HTTP_304_NOT_MODIFIED)    

        except: 
                
            new_like =  Like.objects.create(
                creator = user,
                image = get_image
            )  

            new_like.save()

           # create_notification( user, get_image.creator , 'like', get_image  )

            return Response(status=status.HTTP_201_CREATED)    



class UnlikeImage(APIView) :

    def delete(self, request, image_id, format=None):
        
        user=request.user

        try: 
            get_image = Image.objects.get(id=image_id)
        
        except : 
            return Response(status=status.HTTP_204_NO_CONTENT)   

        try :
            existed_like= Like.objects.get(
                creator=user,
                image = get_image
            )
            
            existed_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)    

        except: 
                
            return Response(status=status.HTTP_304_NOT_MODIFIED)    


class CommentImage(APIView):
    
    def post(self, request, image_id, formant=None):
        
        user=request.user

        try : 
            found_image = Image.objects.get(id=image_id)
        except  Image.DoesNotExist : 
            return Response(status=status.HTTP_404_NOT_FOUND)           

        serializer = CommentSerializer(data=request.data)    

        if serializer.is_valid():

            serializer.save(creator=user, image=found_image)

            create_notification(user,found_image.creator, 'comment', found_image,serializer.data['message']   )

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)    

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        

class DeleteComment(APIView):

    def delete(self, request, comment_id, format=None):

        user=request.user        
        
        try : 
            found_comment = Comment.objects.get(id=comment_id, creator=user)
            found_comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class People(APIView) :

    def get(self, request, format=None ) :
        
        try : 
            user_List = UserProfile.objects.all() 

            serializer=UserProfileSerializer(user_List, many=True)
        
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        except User.DoesNotExist : 
            return Response(status=status.HTTP_404_NOT_FOUND)
        


class Follower(APIView):
    
    def get(self, request, username, format=None):
        
        try : 
            getUser = User.objects.get(username=username) 

        except User.DoesNotExist : 
            return Response(status=status.HTTP_404_NOT_FOUND)

        FollowerData=UserProfile.objects.get(user=getUser)
        
        FollowerUser=FollowerData.followers.all()

        serializer=ListUserProfileSerializer(FollowerUser, many=True,  context={"request" : request})
        
        return Response(data=serializer.data, status=status.HTTP_200_OK)
        

class UserFollowing(APIView):
    
    def get(self, request, username, format=None):
        
        try : 
            getUser = User.objects.get(username=username) 

        except User.DoesNotExsit :
            return Respose(status=status.HTTP_404_NOT_FOUNT)
            
        FollowingData=UserProfile.objects.get(user=getUser)
            
        FollowingUser=FollowingData.following.all()

        serializer=ListUserProfileSerializer(FollowingUser, many=True, context={"request" : request})
        
        return Response(data=serializer.data, status=status.HTTP_200_OK)
        

class Follow(APIView):
    
    def post(self, request, username, format=None):

        user=request.user

        try :
            to_user=User.objects.get(username=username)
            user_to_follow = UserProfile.objects.get(user=to_user) 
            print (user_to_follow)
        except User.DoesNotExist :
            return Response(status=status.HTTP_404_NOT_FOUND)

        user =  UserProfile.objects.get(user=user)
                   
        print(user)
        
        user.following.add(user_to_follow)
        
        user.save()

        create_notification( request.user, to_user , 'follow' )
        
        return Response(status=status.HTTP_201_CREATED)              


class Unfollow(APIView):
    
    def post(self, request, user_id, format=None):

        user=request.user

        try :
            user_to_follow = UserProfile.objects.get(id=user_id)
            print (user_to_follow)
        except User.DoesNotExist :
            return Response(status=status.HTTP_404_NOT_FOUND)

        user =  UserProfile.objects.get(user=user)
            
        print(user)
        
        user.following.remove(user_to_follow)
        user.save()

        return Response(status=status.HTTP_201_CREATED)              

class UserData(APIView) :

    def getUser(self, username):
        try : 
            userdata = User.objects.get(username=username)
            return  userdata
        except User.DoesNotExist : 
            return None
        
    def get(self, request, username, format=None) :
        
        userdata = self.getUser(username=username)

        if userdata is None :   
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user =  UserProfile.objects.get(user=userdata)
       
        serializer=UserProfileSerializer(user)
        
        print(serializer.data)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, username, format=None):
        
        user=request.user
        
        userdata =self.getUser(username=username)

        if userdata is None  :
        
            return Response(status=status.HTTP_404_NOT_FOUND)

        elif userdata.username != user.username : 
        
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        else :  

            user =  UserProfile.objects.get(user=userdata)

            serializer=UserProfileSerializer(user, data=request.data, partial=True)

            if serializer.is_valid() : 

                serializer.save()

                return Response(data=serializer.data, status=status.HTTP_404_NOT_FOUND)
            else : 
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class Search(APIView) :
    def get(self, request, format=None) :
        
        hashtags=request.query_params.get('hashtags', None)
        
        if hashtags is not None :
        
            hashtags= hashtags.split(",")

            images= Image.objects.filter(tags__name__in = hashtags).distinct()

            serializer=ImageSerializer(images, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else :
            return Response(status=status.HTTP_400_BAD_REQUEST)


        
        
class Search_User(APIView) :
    def get(selft, request, format=None) :
        
        username = request.query_params.get('username', None)

        if username is not None :
            
            userData=User.objects.all().filter(username__icontains=username)

            print('userData', userData)
            
            #serializer=ListUserSerializer(userData, many=True)

            #return Response(data=serializer.data, status=status.HTTP_200_OK)

            user = UserProfile.objects.filter(user__id__in=userData)
            
            #print(user)

            serializer=ListUserProfileSerializer(user, many=True, context={"request" : request})

            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        else :
            
            return Response(statu=status.HTTP_400_BAD_REQUEST)

class ModerateComment(APIView):
    
    def delete(self, request, image_id, comment_id, format=None):
        
        user=request.user

        #내가 올린 이미지 중에 다른 사람이 쓴 글을 지우기
        try :
            toDeleteComment = Comment.objects.get(id=comment_id, image__id=image_id, image__creator=user)
        except Comment.DoesNotExist :
            return Response(status=status.HTTP_404_NOT_FOUND)

        toDeleteComment.delete()
        
        return Response(status=status.HTTP_200_OK)

class ImageView(APIView):
    
    def check_image(self, image_id, user) :
        try : 
            image=Image.objects.get(id=image_id, creator=user)
            return image
        except Image.DoesNotExist:
            return None


    def get(self, request, image_id, format=None):

        try : 
            image=Image.objects.get(id=image_id)        
        except  Image.DoesNotExist :
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer=ImageSerializer(image, context={'request':request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, image_id, fromat=None):

        user=request.user

        image=self.check_image(image_id, user)

        if image is None : 
            
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer=UpdateImageSerializer(image, data=request.data, partial=True)

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        else :
        
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, image_id, format=None) : 
        
        user=request.user

        image=self.check_image(image_id, user)

        if image is None : 
            
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        image.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)



class ImageViewLikes(APIView):
    
    def get(self, request, image_id, format=None) : 
        try : 
            like_list=Like.objects.filter(image__id=image_id)        
        except  Image.DoesNotExist :
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer=LikeSerializer(like_list, many=True, context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class ChangePassword(APIView):
    
    def put(self, request, format=None):
    
        user=request.user 
        
        current_password = request.data.get('current_password', None)
        
        if current_password is not None : 
            
            password_match = user.check_password(current_password)
        
            if password_match : 
        
                new_password = request.data.get('new_password', None) # 새루운 패스워드를 받아서

                if new_password is not None :
                    
                    user.set_password(new_password)

                    user.save()

                    return Response(status=status.HTTP_200_OK)    

                else : 
        
                    return Response(status=status.HTTP_400_BAD_REQUEST)

            else : 

                return Response(status=status.HTTP_400_BAD_REQUEST)    
        else : 

            return Response(status=status.HTTP_400_BAD_REQUEST)            
   
