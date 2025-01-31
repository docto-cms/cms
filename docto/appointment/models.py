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
    doc = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="patientappoinments")
    treatment = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    date = models.DateTimeField()
    duration = models.IntegerField(default=15) 

    STATUS_CHOICES = [
        (0, 'Decline'),
        (1, 'Accept'),
        (2, 'Waiting')
    ]
    
    status = models.IntegerField(choices=STATUS_CHOICES, default=2)

    def __str__(self):
        return f"{self.first_name} with {self.doc.firstname} on {self.date}"


class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="appointments")
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="appointments")
    treatment = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    date = models.DateTimeField()
    duration = models.IntegerField(default=15) 

    STATUS_CHOICES = [
        (0, 'Canceled'),
        (1, 'Done'),
        (2, 'Engaged'),
        (3, 'Waiting'),
        (4, 'Scheduled'),
    ]
    
    status = models.IntegerField(choices=STATUS_CHOICES, default=4)

    def __str__(self):
        return f"{self.patient.FirstName} with {self.doctor.firstname} on {self.date}"
    

