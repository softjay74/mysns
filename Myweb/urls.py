
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from home.views import FacebookLogin
from Myweb import views
#from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    #path('api-token-auth/', obtain_jwt_token),
    #path('api-token-refresh/', refresh_jwt_token),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('admin/', admin.site.urls),
    
    path ('', include('home.urls')),
    #path ('', views.ReactAppView.as_view()),
    #path ('home/<slug>/', include('home.urls')),
    path ('/<slug>/', include('home.urls')),
    path('account/',include('accounts.urls')),
    path('notification/', include('notification.urls')),
    #re_path('.*/', TemplateView.as_view(template_name='index.html')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


