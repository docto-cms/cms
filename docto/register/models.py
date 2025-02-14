from django.db import models
from django.utils.crypto import get_random_string

def generate_otp():
    return get_random_string(6, allowed_chars="0123456789")

class User(models.Model):
    first_name = models.CharField(max_length=50 , null=False)
    second_name = models.CharField(max_length=50 ,null=False)
    clinic_id = models.IntegerField(unique=True ,null=False)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.first_name} {self.second_name} - {self.clinic_id}"

class OtpToken(models.Model):
    email = models.EmailField(unique=True)  # OTP is linked to email, not user
    otp_code = models.CharField(max_length=6, default=generate_otp)  # Use function instead of lambda
    otp_expires_at = models.DateTimeField()

    def __str__(self):
        return f"OTP for {self.email}"
