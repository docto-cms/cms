from django.urls import path
from .views import *

urlpatterns = [
    path('patients/', PatientDetailAPIView.as_view(), name='patients'),  # List all patients
    path('patients/<int:pk>/', PatientDetailAPIView.as_view(), name='patient_detail'),  # Detail view
    path('basicinfo/', BasicInfoAPIView.as_view(), name='basicinfo-list'),#Quick entry
    path("doctor/", DoctorDetailAPIView.as_view(), name="doctor"),
    path("todayspatients/", TodaysPatientListAPIView.as_view(), name="todayspatients"),
    path("PatientsBeforeThisMonth/", PatientsBeforeThisMonth.as_view(), name="PatientsBeforeThisMonth"),
    path("NewPatientsOfMonth/", NewPatientsOfMonth.as_view(), name="NewPatientsOfMonth"),
]
