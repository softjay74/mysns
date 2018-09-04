from django.contrib import admin
from accounts.models import *

# Register your models here.
admin.site.site_header="Administration"

admin.site.register(UserProfile)
admin.site.register(Image)
admin.site.register(MyPost)
admin.site.register(Comment)
admin.site.register(Like)