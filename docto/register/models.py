from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=50 , null=False)
    second_name = models.CharField(max_length=50 ,null=False)
    clinic_id = models.IntegerField(unique=True ,null=False)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.first_name} {self.second_name} - {self.clinic_id}"
