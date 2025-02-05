from django.urls import path
from .views import *

urlpatterns = [
    path('mobileappointments/', AppointmentMobileAPIView.as_view(), name='mobileappointments'),
    path('mobileappointments/<int:appointment_id>', AppointmentMobileAPIView.as_view(), name='mobileappointments-details'),
    path('mobileappointmetsedit/<int:appointment_id>',EditAppointmentMobileAPIView.as_view(),name='mobileappointmetsedit'),
    path('appointments/', AppointmentAPIView.as_view(), name='appointments'),
<<<<<<< HEAD
    path('doctorsearch/', DoctorAppointmentsDatesAPIView.as_view(), name='doctorsearch'),
    path('appointmentdelete/', AppointmentDeleteView.as_view(), name='appointmentdelete'),
=======
    path('doctorsearch', DoctorAppointmentsDatesAPIView.as_view(), name='doctorsearch'),
    path('appointmentdelete', AppointmentDeleteView.as_view(), name='appointmentdelete'),
>>>>>>> 53be633cbe8e2762fb0e7d5dad345d8db8bf0f18
    path('appointments/<int:appointment_id>', UpdateAppointmentStatusAPIView.as_view(), name='apoointments-update-status'),
]
