from django.contrib import admin
from notification.models import * 
# Register your models here.

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):

    list_display = (
        'from_user',
        'to_user',
        'notification_type'
    )

