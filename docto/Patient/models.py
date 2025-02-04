from django.db import models


class Patient(models.Model):
    
    
    GENDER_CHOICES = [
        ("M", "Male"),
        ("F", "Female"),
        ("O", "Other"),
    ]
    
    RegistrationId = models.AutoField(primary_key=True, unique=True)
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    PhoneNumber = models.IntegerField()
    Email = models.EmailField(max_length=100)
    Age = models.IntegerField(default=1)
    city = models.CharField(max_length=100) 
    Gender = models.CharField(max_length=100, choices=GENDER_CHOICES)
    Doctor = models.CharField(max_length=100)
    RecNo = models.CharField(max_length=100)
    Fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    ConsultationFee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True
    )
    FeeType = models.CharField(max_length=100)

    def _str_(self):
        return f"{self.RegistrationId} {self.FirstName} {self.LastName}"
