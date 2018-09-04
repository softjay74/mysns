from django.urls import path
from . import views
from home.views import Homeview, FeedView

urlpatterns =[
      path('', Homeview.as_view(), name="home" ),
      #path('feed/', FeedView.as_view(), name="feed"),
      path('post/<slug:image_id>/', views.ImageView.as_view(), name="image_view"),
      path('post/<slug:image_id>/likes', views.ImageViewLikes.as_view(), name="image_view"),
      path('like/<slug:image_id>/', views.LikeImage.as_view(), name="like_image"),
      path('unlike/<slug:image_id>/', views.UnlikeImage.as_view(), name="unlike_image"),
      path('comment/<slug:image_id>/', views.CommentImage.as_view(), name="comment_image"),
      path('comment/del/<slug:comment_id>/', views.DeleteComment.as_view(), name="delete_comment"),
      path('comment/del/<slug:image_id>/<slug:comment_id>', views.ModerateComment.as_view(), name="moderate_comment"),
      path('people/', views.People.as_view(), name="people"),
      path('follower/<slug:username>', views.Follower.as_view(), name="follower"), #follower List
      path('follow/<slug:username>', views.Follow.as_view(), name="follow"),  # execute following 
      path('following/<slug:username>', views.UserFollowing.as_view(), name="user_following"), # following user list
      path('unfollow/<slug:user_id>', views.Unfollow.as_view(), name="unfollow"),
      path('feed/', FeedView.as_view(), name="like_url"),
      path('profile/<slug:username>', views.UserData.as_view(), name="user_data"),
      path('profile/password/', views.ChangePassword.as_view(), name='ChangePassword'),
      path('search/profile/', views.Search_User.as_view(), name="search_user"),
      path('search/', views.Search.as_view(), name="search"),
]
