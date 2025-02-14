from rest_framework import serializers
from .models import *

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['__all__']
    
    def get_doctor_name(self, obj):
        if obj.Doctor:  
            return f"{obj.Doctor.firstname} {obj.Doctor.lastname}"
        return "No Doctor Assigned"

class BasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['RegistrationId','FirstName','LastName','PhoneNumber','Age','Gender','Doctor']
    
class DocterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Doctor
        fields='__all__'