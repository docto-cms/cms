from django.db import models
from Patient.models import *

class Doctor(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.firstname


class PatientAppointment(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=15)
    email = models.EmailField(blank=True, null=True)
    doc = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name="patientappoinments"
    )
    treatment = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    date = models.DateTimeField()
    duration = models.IntegerField(default=15)

    STATUS_CHOICES = [(0, "Decline"), (1, "Accept"), (2, "Waiting")]

    status = models.IntegerField(choices=STATUS_CHOICES, default=2)

    def __str__(self):
        return f"{self.first_name} with {self.doc.firstname} on {self.date}"


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
        (0, 'Canceled'),
        (1, 'Done'),
        (2, 'Engaged'),
        (3, 'Waiting'),
        (4, 'Scheduled'),
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
    status = models.IntegerField(choices=STATUS_CHOICES, default=4)



    def __str__(self):
        return self.Patient.FirstName 
