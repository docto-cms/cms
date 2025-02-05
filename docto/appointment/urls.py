from django.urls import path
from .views import *

urlpatterns = [
    path('mobileappointments/', AppointmentMobileAPIView.as_view(), name='mobileappointments'),
    path('mobileappointments/<int:appointment_id>', AppointmentMobileAPIView.as_view(), name='mobileappointments-details'),
    path('mobileappointmetsedit/<int:appointment_id>',EditAppointmentMobileAPIView.as_view(),name='mobileappointmetsedit'),
    path('appointments/', AppointmentAPIView.as_view(), name='appointments'),
    path('doctorsearch/', DoctorAppointmentCountAPIView.as_view(), name='doctorsearch'),
    path('appointmentdelete/', AppointmentDeleteView.as_view(), name='appointmentdelete'),
    path('appointments/<int:appointment_id>', UpdateAppointmentStatusAPIView.as_view(), name='apoointments-update-status'),
]
# vjSHDHvfisduvhizk