"""web_first_prodject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.urls import path
from api import views
from django.conf.urls.static import static
from django.conf import settings
from django.conf.urls import url, include

urlpatterns = [
    path('all_items/', views.all_items),
    path('items/', views.filter_items),
    path('infItem/', views.inf_item),
    path('registration/', views.registration),
    path('logout/', views.logout),
    path('login/', views.login),
    path('change_avatar/', views.change_avatar),
    #url(r'^upload/(?P<filename>[^/]+)$', views.FileUploadView.as_view()),
    path('rate/', views.rate),
    path('new_comment/', views.new_comment),
    path('old_comments/', views.old_comments),
    path('delete_comment/', views.delete_comment),
    path('best_item/', views.best_item),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)