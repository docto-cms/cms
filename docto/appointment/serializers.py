from rest_framework import serializers
from .models import *


class PatientAppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source="doctor.firstname", read_only=True)
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
    doctor = serializers.SlugRelatedField(queryset=Doctor.objects.all(), slug_field='firstname')
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


# class AppointmentSerializer(serializers.ModelSerializer):
#     patient = serializers.CharField(source="patient.FirstName", read_only=True)
#     doctor = serializers.CharField(source="doctor.firstname", read_only=True)

#     class Meta:
#         model = Appointments
#         fields = "__all__"


class AppointmentGetSerializer(serializers.ModelSerializer):
    Patient = serializers.CharField(source="Patient.FirstName", read_only=True)
    RegistrationId = serializers.CharField(source="Patient.RegistrationId", read_only=True)
    Doctor = serializers.IntegerField(source="Doctor.id", read_only=True)

    class Meta:
        model = Appointments
        fields = [
            "id",
            "RegistrationId",
            "Patient",
            "Doctor",
            "Treatment",
            "Date",
            "Duration",
            "status",
        ]