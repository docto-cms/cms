from django.urls import path
from .views import PatientDetailAPIView

urlpatterns = [
    path('patients/', PatientDetailAPIView.as_view(), name='patients'),  # List all patients
    path('patients/<int:pk>/', PatientDetailAPIView.as_view(), name='patient_detail'),  # Detail view
]
