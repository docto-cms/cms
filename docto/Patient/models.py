from django.db import models


class Doctor(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.firstname

class Patient(models.Model):

    Gender_Choices = [
        ('Male','Male'),
        ('Female','Female'),
        ('Other','Other')
    ]

    RegistrationId = models.AutoField(unique=True,primary_key=True)
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    PhoneNumber = models.IntegerField()
    Email = models.EmailField(max_length=100)
    Age = models.IntegerField(null=True)
    Gender = models.CharField(max_length=100, choices=Gender_Choices)
    City=models.CharField(max_length=100)
    Doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE ,null=True)
    RefferedBy = models.CharField(max_length=100,null=True)
    Fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    FeeType = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.RegistrationId} {self.FirstName} {self.LastName}"

# from django.db import models

# class Patient(models.Model):
#     GENDER_CHOICES = [
#         ('M', 'Male'),
#         ('F', 'Female'),
#         ('O', 'Other')
#     ]

#     registration_id = models.AutoField(unique=True, primary_key=True)
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     phone_number = models.CharField(max_length=15)  # Changed from IntegerField to CharField
#     email = models.EmailField(max_length=100)
#     age = models.IntegerField(null=True, blank=True)  # Allow null and blank values
#     gender = models.CharField(max_length=1, choices=GENDER_CHOICES)  # Set max_length to 1 for better storage
#     city = models.CharField(max_length=100, blank=True, null=True)
#     doctor = models.CharField(max_length=100)
#     referred_by = models.CharField(max_length=100)  # Fixed spelling from "RefferedBy"
#     fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
#     consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
#     fee_type = models.CharField(max_length=100, blank=True, null=True)  # Allow blank values

#     def __str__(self):
#         return f"{self.registration_id} - {self.first_name} {self.last_name}"

