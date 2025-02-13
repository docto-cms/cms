from django.db import models
from Patient.models import *

#mobile
class PatientAppointment(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=15)
    email = models.EmailField(blank=True, null=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    treatment = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    date = models.DateTimeField()
    duration = models.IntegerField(default=15)

    STATUS_CHOICES = [("Decline", "Decline"), ("Accept", "Accept"), ("Waiting", "Waiting")]

    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="Waiting")

    def __str__(self):
        return f"{self.first_name} with {self.doctor.firstname} on {self.date}"


class Appointments(models.Model):
    APPOINTMENT_TYPE_CHOICES = [
        ("scheduled", "Scheduled"),
        ("walkin", "Walkin"),
        ("phone_online", "Phone/Online"),
    ]

    DURATION_CHOICES = [
        (5, "5"),
        (10, "10"),
        (15, "15"),
        (20, "20"),
        (25, "25"),
        (30, "30"),
        (35, "35"),
        (40, "40"),
        (45, "45"),
        (50, "50"),
        (55, "55"),
        (60, "60"),
    ]

    STATUS_CHOICES = [
        ('Canceled', 'Canceled'),
        ('Done', 'Done'),
        ('Engaged', 'Engaged'),
        ('Waiting', 'Waiting'),
        ('Scheduled', 'Scheduled'),
    ]
    Patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    Doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    Date = models.DateTimeField()
    Duration = models.PositiveIntegerField(choices=DURATION_CHOICES)
    Repeat = models.BooleanField(default=False)
    Treatment = models.TextField(blank=True, null=True)
    AppointmentType = models.CharField(max_length=100, choices=APPOINTMENT_TYPE_CHOICES)
    Notes = models.TextField(blank=True, null=True)
    GoogleMeetLink = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=50,choices=STATUS_CHOICES, default="Scheduled")



    def __str__(self):
        return self.Patient.FirstName 
