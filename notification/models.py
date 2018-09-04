from django.db import models
from django.contrib.auth.models import User
from accounts.models import Image, TimeStamped

class Notification (TimeStamped):

    TYPE_CHOICES =(
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('follow', 'Follow')
    )

    from_user = models.ForeignKey (User, on_delete=models.CASCADE, related_name='from_user')
    to_user = models.ForeignKey( User, on_delete=models.CASCADE, related_name='to_user')
    notification_type = models.CharField(max_length=100, choices=TYPE_CHOICES)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True)
    comment=models.TextField(null=True, blank=True)                                  

