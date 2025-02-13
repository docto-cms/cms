# from django.urls import path
# from .views import *

# urlpatterns = [
#     path('patients/', PatientDetailAPIView.as_view(), name='patients'),  # List all patients
#     path('patients/<int:pk>/', PatientDetailAPIView.as_view(), name='patient_detail'),  # Detail view
#     path('basicinfo/', BasicInfoAPIView.as_view(), name='basicinfo-list'),#Quick entry
# ]
from django.urls import path
# from .views import PatientListAPIView, PatientDetailAPIView, BasicInfoAPIView
from .views import  PatientDetailAPIView, BasicInfoAPIView


urlpatterns = [
    path('patients/', PatientDetailAPIView.as_view(), name='patients'),  # List all patients
    path('patients/<int:pk>/', PatientDetailAPIView.as_view(), name='patient_detail'),  # Get details of a specific patient
    path('basic-info/', BasicInfoAPIView.as_view(), name='basic-info'),  # Quick Entry API
]
