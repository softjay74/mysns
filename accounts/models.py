from django.db import models
from taggit.managers import TaggableManager
from django.contrib.auth.models import User
from django.db.models.signals import post_save

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE, related_name='user_p' )
    description = models.CharField(max_length=100, default='')
    city = models.CharField(max_length=100, default='')
    website = models.URLField (default='')
    phone = models.IntegerField(default=0)
    profileImage = models.ImageField(upload_to ='profile_image', blank=True)
    followers = models.ManyToManyField('self', blank=True)
    following = models.ManyToManyField('self', blank=True)
    
    def __str__(self):
        return self.user.username
    @property
    def followersCount(self):
        return self.followers.all().count()
    
    @property
    def followingCount(self):
        return self.following.all().count()

def create_profile(sender, **kwargs):
    if kwargs['created']:
        user_profile = UserProfile.objects.create(user=kwargs['instance'])

post_save.connect(create_profile, sender=User)


class MyPost(models.Model):
    post = models.CharField(max_length=500)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)


class TimeStamped(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Image(TimeStamped):
    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='images')
    tags=TaggableManager()
    
    @property
    def count_likes(self):
        return self.like.all().count()

class Comment(TimeStamped):
    message = models.TextField()    
    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, related_name='comment')

class Like(TimeStamped) :
    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, related_name='like')