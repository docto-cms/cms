from django.urls import path
from .views import *

urlpatterns=[
    path('regester/',RegisterView.as_view()),
    path("login/",LoginView.as_view()),
    path('logout/',LogoutView.as_view()),
    path("ChangePassword",ChangePassword.as_view())
]