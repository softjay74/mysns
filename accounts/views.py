from django.shortcuts import render, redirect
from django.contrib.auth.forms import PasswordChangeForm
from accounts.forms import (
        RegistrationForm, 
        EditProfileForm ,
        PostingForm
)    
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from accounts.models import MyPost, Image, Comment, Like, UserProfile
from accounts.serializers import ImageSerializer, CommentSerializer, LikeSerializer, ProfileImgSerializer, UserSerializer, UserProfileSerializer


from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response



# Create your views here.

def home(request):
    return render(request, 'accounts/home.html')

def register(request):
    form=RegistrationForm()
    args = {'form': form }

    if request.method == "POST" :
        form = RegistrationForm(request.POST)    
        if form.is_valid():
            form.save()
            return redirect('/account')    
        else :
             return render(request, 'accounts/reg_form.html', args)          
    else :
      
        return render(request, 'accounts/reg_form.html', args)  

#@login_required(login_url='/login')
@login_required
def profile(request):
    args = {'user': request.user}
    return render(request, 'accounts/profile.html', args)

@login_required
def edit_profile(request):
    form = EditProfileForm(instance=request.user)
    args = {'form' : form}

    if request.method=="POST" :
        form = EditProfileForm(request.POST, instance=request.user)
        if form.is_valid() :
            form.save()
            return redirect('/profile')
        else :         
            return render(request, 'accounts/edit_profile.html', args)
    else :
        return render(request, 'accounts/edit_profile.html', args)   

@login_required
def change_password(request):
    form = PasswordChangeForm(user=request.user)
    args = { 'form': form }
    if request.method=="POST":
        form = PasswordChangeForm(data=request.POST, user=request.user)

        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            return redirect('/account/profile')
        else :
            return redirect('/accounts/edit/password')
    else :
        return render(request, 'accounts/edit_password.html', args)        


class PostingView(TemplateView):
    template_name ="accounts/home.html"

    def get(self, request):
        form = PostingForm()
        
        posts = MyPost.objects.all().order_by('created')
        users = User.objects.all()        
        args ={'form': form , 'posts': posts}
        #args ={'form': form }
        return render(request, self.template_name, args )

    def post(self, request):
        form = PostingForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.user=request.user
            post.save()
            return redirect('/account')    


class ListAllImage(APIView):
    def get(self, request, format=None):
        all_images = Image.objects.all()
        allData = ImageSerializer(all_images, many=True)
        return Response(data=allData.data)

class ListAllComment(APIView):
    def get(self, request, fromat=None):
        all_comments = Comment.objects.all()
        allData = CommentSerializer(all_comments, many=True)
        return Response(data=allData.data)

class ListAllLike(APIView):
    def get(self, request, format=None):
        all_likes = Like.objects.all()
        allLikes = LikeSerializer(all_likes, many=True)

        return Response(data=allLikes.data)

class test(APIView):
    def get(self, request):
        Pimgs = User.objects.all().select_related()
        Pimg = UserSerializer(Pimgs, many=True)
        return Response(data=Pimg.data)

class ChangePassword(APIView):
    
    def put(self, request, username, format:None):
        pass
