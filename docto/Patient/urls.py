from django.urls import path
from .views import *

urlpatterns = [
    path('patients/', PatientDetailAPIView.as_view(), name='patients'),  # List all patients
    path('patients/<int:pk>/', PatientDetailAPIView.as_view(), name='patient_detail'),  # Detail view
    path('basicinfo/', BasicInfoAPIView.as_view(), name='basicinfo-list'),#Quick entry
    path("docter/", DoctorDetailAPIView.as_view(), name="docter"),
]
