from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Doctor)
admin.site.register(PatientAppointment)
admin.site.register(Appointments)
