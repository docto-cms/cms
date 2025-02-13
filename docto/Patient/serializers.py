from rest_framework import serializers
from .models import *

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Patient
        fields='__all__'

class BasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['RegistrationId','FirstName','LastName','PhoneNumber','Age','Gender','Doctor']
    