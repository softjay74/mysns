from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView 
from rest_framework.response import Response
from notification.serializers import NotificationSerializer
from notification.models import Notification

# Create your views here.

class NotificationView(APIView):
    def get(self, request, format=None):
        
        user=request.user

        notification=Notification.objects.filter(to_user=user)
    
        #if notification is not None :

        print(notification)

        serializer=NotificationSerializer(notification, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

        #else :
        # return Response(status=status.HTTP_400_BAD_REQUEST)


def create_notification(from_user, to_user, notification_type, image = None, comment=None):

    notification = Notification.objects.create(
        from_user=from_user,
        to_user = to_user,
        notification_type = notification_type,
        image = image,
        comment = comment
    )

    notification.save()

        