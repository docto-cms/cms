from django.urls import path
from .views import *

urlpatterns=[
    path('register',RegisterView.as_view()),
    path("login",LoginView.as_view()),
    path('logout',LogoutView.as_view()),
    path("ChangePassword",ChangePassword.as_view()),
    path("sendOTP",send_otp.as_view()),
    path("ForgotPassword",forgotPassword.as_view()),
    path("Doctorget/<int:clinic_id>/",DoctorDetails.as_view())
]