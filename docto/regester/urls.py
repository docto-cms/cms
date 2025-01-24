from django.urls import path
from .views import *

urlpatterns=[
    path('regester/',RegisterView.as_view()),
    path("login/",LoginView.as_view()),
    path('logout/',LogoutView.as_view()),
    path("display/<int:user_id>/",RetrieveUserView.as_view())
]