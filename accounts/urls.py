from django.urls import path
from django.conf.urls import url
from . import views
#from django.contrib.auth.views import (
#    password_reset, password_reset_done, password_reset_confirm, password_reset_complete
#) 
from accounts.views import PostingView, ListAllImage, ListAllLike



urlpatterns = [
    path('', PostingView.as_view(), name="home"),
    path('account/', PostingView, name="home"),
    #path('login/', login, {'template_name': 'accounts/login.html'}),
    #path('logout/', logout, {'template_name': 'accounts/logout.html'}),
    #path('register/', views.register, name='register'),
    #path('profile/', views.profile, name='profile'),
    #path('profile/edit', views.edit_profile, name='edit_profile'),
    #path('profile/edit/password', views.change_password, name='change_password'),
    #path('reset-password/', password_reset, name='reset_password'),
    path('image/', views.ListAllImage.as_view(), name='images'),
    path('comment/', views.ListAllComment.as_view(), name='comments'),
    path('like/', views.ListAllLike.as_view(), name='likes'),
    path('test/', views.test.as_view(), name='likes'),

    #path('posting/', PostingView.as_view(), name="posting" ),
   
    # Reset password via Email 
    #path('reset-password/done', password_reset_done, name='password_reset_done'),
    #path('reset-password/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/', password_reset_confirm, name='password_reset_confirm'),
    #path('reset-password/complete', password_reset_complete, name="password_reset_complete")
]
