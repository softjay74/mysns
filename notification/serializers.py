from rest_framework import serializers
from notification.models import *
from accounts.serializers import *


class NotificationSerializer(serializers.ModelSerializer):
    
    from_user=ListUserSerializer()
    to_user=ListUserSerializer()
    image=ImageSerializer()


    class Meta :
        model = Notification
        fields ="__all__"