from rest_framework import serializers
from .models import *

class PatientSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='Doctor.firstname', default="No Doctor Assigned", read_only=True)

    class Meta:
        model = Patient
        fields = [
            'RegistrationId', 'FirstName', 'LastName', 'PhoneNumber', 
            'Email', 'Age', 'Gender', 'City', 'doctor_name', 'RefferedBy', 
            'Fee', 'FeeType'
        ]

class BasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['RegistrationId','FirstName','LastName','PhoneNumber','Age','Gender','Doctor']
    