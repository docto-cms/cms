from django.urls import path
from .views import *

urlpatterns = [
    path('mobileappointments', AppointmentMobileAPIView.as_view(), name='mobileappointments'),
    path('mobileappointments/<int:appointment_id>', AppointmentMobileAPIView.as_view(), name='mobileappointments-details'),
    path('mobileappointmentsedit/<int:appointment_id>',EditAppointmentMobileAPIView.as_view(),name='mobileappointmetsedit'),
    path('appointments/', AppointmentAPIView.as_view(), name='appointments'),
    path('count/', AppointmentTotalCountAPIView.as_view(), name='count'),
    path('appointmentdelete/', AppointmentDeleteView.as_view(), name='appointmentdelete'),
    path('appointments/<int:appointment_id>', UpdateAppointmentStatusAPIView.as_view(), name='apoointments-update-status'),
    path('DocterAppointmentByDocterId/<int:id>', DocterAppointmentByDoctorId.as_view(), name='appointment-details'),
    path('appointmentbydate/', TodayAppointmentsAPIView.as_view(), name='appointmentbydate'),
    path('TotalCanceledAppointments/', TotalCanceledAppointments.as_view(), name='appointmentbydoctor'),
    path('upcomingappointmentsWeek/', UpcomingAppointmentsWeek.as_view(), name='upcomingappointments'),
    path('MissedAppointments/', MissedAppointments.as_view(), name='appointmentbydoctor'),
    path("UpComingAppointmentsToday/", UpComingAppointmentsToday.as_view(), name="UpComingAppointmentsToday"),
    path("AppointmentsByMonth/", AppointmentsByMonth.as_view(), name="AppointmentsByMonth"),
]
