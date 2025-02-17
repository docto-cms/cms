from rest_framework import serializers
from .models import *


class PatientAppointmentSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = PatientAppointment
        fields = [
            "id",
            "first_name",
            "last_name",
            "mobile_number",
            "email",
            "doctor",
            "treatment",
            "notes",
            "date",
            "duration",
            "status",
        ]


class PatientAppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAppointment
        fields = [
            'first_name', 
            'last_name', 
            'mobile_number', 
            'email', 
            'doctor', 
            'treatment', 
            'notes', 
            'date', 
            'duration'
            ]
    

class AppointmentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAppointment
        fields = ["status"]



class AppointmentGetSerializer(serializers.ModelSerializer):
    RegistrationId = serializers.CharField(source="Patient.RegistrationId", read_only=True)
    PatientName = serializers.SerializerMethodField()
    Doctor = serializers.PrimaryKeyRelatedField(source="Doctor.id", read_only=True)

    class Meta:
        model = Appointments
        fields = [
            "id",
            "RegistrationId",
            "PatientName",
            "Doctor",
            "Treatment",
            "Date",
            "Duration",
            "status",
        ]

    def get_PatientName(self, obj):
        return f"{obj.Patient.FirstName} {obj.Patient.LastName}" if obj.Patient else None
