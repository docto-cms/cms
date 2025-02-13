# from rest_framework import serializers
# from .models import *

# class PatientSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Patient
#         fields='__all__'

# class BasicInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Patient
#         fields = ['RegistrationId','FirstName','LastName','PhoneNumber','Email','Age','Gender','RefferedBy','Doctor']
        # fields = ['registration_id', 'first_name', 'last_name', 'phone_number', 'email', 'age', 'gender', 'referred_by', 'doctor']

from rest_framework import serializers
from .models import Patient  # Importing only required models

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = "__all__"

class BasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            "RegistrationId",
            "FirstName",
            "LastName",
            "PhoneNumber",
            "Email",
            "Age",
            "Gender",
            "RefferedBy",
            "Doctor",
        ]





    