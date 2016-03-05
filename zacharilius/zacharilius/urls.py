from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^', include('portfolio.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^maps/', include('maps.urls')),
    url(r'^projects/', include('projects.urls')),
    url(r'^resume/', include('resume.urls')),
]
