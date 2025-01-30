from django.db import models

class Patient(models.Model):
    RegistrationId = models.CharField(max_length=100, unique=True)
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    PhoneNumber = models.CharField(max_length=15)  # Changed from IntegerField to CharField
    Email = models.EmailField(max_length=100)
    Age = models.IntegerField()
    Gender = models.CharField(max_length=100)
    Doctor = models.CharField(max_length=100)
    Fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    ConsultationFee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    FeeType = models.CharField(max_length=100, null=True, blank=True)  # Allow null values

    def __str__(self):
        return f'{self.RegistrationId} {self.FirstName} {self.LastName}'
