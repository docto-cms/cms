from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from Patient.models import Patient
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_datetime
from django.utils.timezone import is_naive, make_aware
from datetime import timedelta, timezone


class AppointmentMobileAPIView(APIView):

    def get(self, request, appointment_id=None):
        """Retrieve all appointments or a specific one."""
        if appointment_id:
            try:
                appointment = PatientAppointment.objects.get(id=appointment_id)
                serializer = PatientAppointmentSerializer(appointment)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except PatientAppointment.DoesNotExist:
                return Response(
                    {"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND
                )

        appointments = PatientAppointment.objects.all()
        serializer = PatientAppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """Create a new appointment."""
        serializer = PatientAppointmentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Appointment created", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, appointment_id):
        """Update appointment status and move it to Appointment model if accepted."""
        try:
            appointment = PatientAppointment.objects.get(id=appointment_id)
        except PatientAppointment.DoesNotExist:
            return Response(
                {"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = AppointmentUpdateSerializer(
            appointment, data=request.data, partial=True
        )
        if serializer.is_valid():
            new_status = serializer.validated_data.get("status")

            if new_status == 1:
                doctor = appointment.doc

                doctor_conflict = Appointments.objects.filter(
                    doctor=doctor, date=appointment.date, duration=appointment.duration
                ).exists()

                if doctor_conflict:
                    return Response(
                        {"error": "Doctor is not available at this time"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                patient, created = Patient.objects.get_or_create(
                    Email=appointment.email,
                    defaults={
                        "FirstName": appointment.first_name,
                        "LastName": appointment.last_name,
                        "MobileNo": appointment.mobile_number,
                    },
                )

                patient_conflict = Appointments.objects.filter(
                    patient=patient,
                    date=appointment.date,
                    duration=appointment.duration,
                ).exists()

                if patient_conflict:
                    appointment.status = 0
                    appointment.save()
                    return Response(
                        {"error": "Patient is already booked at this time"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                appointment_obj = Appointments.objects.create(
                    patient=patient,
                    doctor=doctor,
                    treatment=appointment.treatment,
                    notes=appointment.notes,
                    date=appointment.date,
                    duration=appointment.duration,
                    status=4,
                )

                appointment.status = 1
                appointment.save()

                return Response(
                    {
                        "message": "Appointment accepted and moved to Appointment model.",
                        "appointment_id": appointment_obj.id,
                        "patient_id": patient.RegistrationId,
                        "new_patient": created,
                    },
                    status=status.HTTP_200_OK,
                )

            appointment.status = new_status
            appointment.save()
            return Response(
                {"message": "Appointment status updated"}, status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, appointment_id):
        """Delete an appointment."""
        try:
            appointment = PatientAppointment.objects.get(id=appointment_id)
            appointment.delete()
            return Response(
                {"message": "Appointment deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except PatientAppointment.DoesNotExist:
            return Response(
                {"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND
            )


class EditAppointmentMobileAPIView(APIView):

    def put(self, request, appointment_id):
        """Edit doctor and date for a specific appointment."""
        try:
            appointment = PatientAppointment.objects.get(id=appointment_id)
        except PatientAppointment.DoesNotExist:
            return Response(
                {"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND
            )

        doctor_firstname = request.data.get("doctor")
        new_date = request.data.get("date")

        if doctor_firstname:
            try:

                doctor = Doctor.objects.get(firstname=doctor_firstname)
                appointment.doc = doctor
            except Doctor.DoesNotExist:
                return Response(
                    {"error": "Invalid doctor firstname"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        if new_date:
            try:
                appointment.date = new_date
            except Exception as e:
                return Response(
                    {"error": f"Invalid date format. {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        appointment.save()

        data = {
            "id": appointment.id,
            "doctor_name": (
                appointment.doc.firstname if appointment.doc else "No Doctor Assigned"
            ),
            "appointment_date": appointment.date.strftime("%Y-%m-%d %H:%M:%S"),
        }

        return Response(
            {"message": "Appointment updated", "data": data}, status=status.HTTP_200_OK
        )


class AppointmentAPIView(APIView):
    """
    View to list all appointments or create a new one.
    """

    def get(self, request):
        appointments = Appointments.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        patient_data = request.data.get("patient", {})
        doctor_name = request.data.get("doctor")
        appointment_data = request.data

        appointment_date = parse_datetime(appointment_data.get("Date"))
        if appointment_date is None:
            return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure the datetime is timezone-aware
        if is_naive(appointment_date):
            appointment_date = make_aware(appointment_date)

        duration = int(appointment_data.get("Duration", 10))  # Assuming duration is in minutes

        doctor_instance = get_object_or_404(Doctor, firstname=doctor_name)

        appointment_end_time = appointment_date + timedelta(minutes=duration)

        # Check if an appointment with the exact same date and time already exists
        exact_appointment_exists = Appointments.objects.filter(
            Doctor=doctor_instance,
            Date=appointment_date
        ).exists()

        if exact_appointment_exists:
            return Response({"error": "An appointment with this exact date and time already exists for this doctor."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Check for overlapping appointments (new appointment must not overlap any existing appointment)
        overlapping_appointments = Appointments.objects.filter(
            Doctor=doctor_instance
        ).filter(
            Date__lt=appointment_end_time,  # Existing appointment starts before new appointment ends
            Date__gte=appointment_date      # Existing appointment ends after new appointment starts
        )

        if overlapping_appointments.exists():
            return Response({"error": "Doctor is not available at this time"}, status=status.HTTP_400_BAD_REQUEST)

        # Create or retrieve patient
        patient_instance, created = Patient.objects.get_or_create(
            FirstName=patient_data.get("FirstName"),
            LastName=patient_data.get("LastName"),
            defaults={
                "PhoneNumber": patient_data.get("PhoneNumber"),
                "Email": patient_data.get("Email"),
                "Age": patient_data.get("Age"),
                "Gender": patient_data.get("Gender"),
                "City": patient_data.get("City"),
            },
        )

        # Create the appointment
        appointment = Appointments.objects.create(
            Patient=patient_instance,
            Doctor=doctor_instance,
            Date=appointment_date,  # Use aware datetime
            Duration=appointment_data.get("Duration"),
            Repeat=appointment_data.get("Repeat"),
            Treatment=appointment_data.get("Treatment"),
            AppointmentType=appointment_data.get("AppointmentType"),
            Notes=appointment_data.get("Notes"),
            GoogleMeetLink=appointment_data.get("GoogleMeetLink"),
        )

        return Response(
            {"message": "Appointment created successfully"},
            status=status.HTTP_201_CREATED,
        )
     
     
class DoctorAppointmentCountAPIView(APIView):

    def get(self, request):
        try:
            doctor_name = request.query_params.get("doctor_name")

            if not doctor_name:
                return Response(
                    {"error": "doctor_name is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                doctor = Doctor.objects.get(firstname=doctor_name)
            except Doctor.DoesNotExist:
                return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)
            
            appointmentscount = Appointments.objects.filter()
            appointment_counts = appointmentscount.count()

            appointments = Appointments.objects.filter(Doctor=doctor).exclude(status__in=[1, 0]).values('Date', 'Duration')
            appointment_count = appointments.count()

            if not appointments:
                return Response(
                    {
                        "doctor_name": doctor.firstname,
                        "appointment_count": 0,
                        "appointments": [],
                    },
                    status=status.HTTP_200_OK,
                )

            appointment_details = [
                {
                    'datetime': appointment['Date'],
                    'duration': appointment['Duration']
                }
                for appointment in appointments
            ]

            return Response({
                'total': appointment_counts,
                'doctor_name': doctor.firstname,
                'appointment_count': appointment_count,
                'appointments': appointment_details
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class AppointmentDeleteView(APIView):

    def delete(self, request):
        try:
            patient_name = request.query_params.get("patient_name")
            mobile_no = request.query_params.get("mobile_no")
            date = request.query_params.get("date")

            if not all([patient_name, mobile_no, date]):
                return Response(
                    {
                        "error": "Missing required parameters: patient_name, mobile_no, and date"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                patient = Patient.objects.get(
                    FirstName=patient_name, PhoneNumber=mobile_no
                )
            except Patient.DoesNotExist:
                return Response(
                    {"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND
                )

            try:
                appointment = Appointments.objects.get(patient=patient, date=date)
            except Appointments.DoesNotExist:
                return Response(
                    {"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND
                )

            appointment.status = 0
            appointment.save()
            # appointment.delete()

            return Response(
                {"message": "Appointment canceled successfully"},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UpdateAppointmentStatusAPIView(APIView):

    def patch(self, request, appointment_id):
        try:
            new_status = request.data.get("status")

            if new_status not in [0, 1, 2, 3, 4]:
                return Response(
                    {"error": "Invalid status value"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                appointment = Appointments.objects.get(id=appointment_id)
            except Appointments.DoesNotExist:
                return Response(
                    {"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND
                )

            if appointment.status == 1:
                return Response(
                    {"done": "Appointment is already done. It cannot be changed."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if appointment.status == 2:
                if new_status not in [1, 0]:
                    return Response(
                        {
                            "done": "Engaged appointments can only be changed to Done or Canceled"
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            if appointment.status == 3:
                if new_status != 2:
                    return Response(
                        {"done": "Waiting appointments can only be changed to Engaged"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            if appointment.status == 4:
                if new_status not in [2, 3]:
                    return Response(
                        {
                            "done": "Scheduled appointments can only be changed to Engaged or Waiting"
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            appointment.status = new_status
            appointment.save()

            return Response(
                {
                    "patient_name": appointment.Patient.FirstName,
                    "doctor_name": appointment.Doctor.firstname,
                    "status": dict(Appointments.STATUS_CHOICES).get(appointment.status),
                    "Date": appointment.Date,
                    "Duration": appointment.Duration,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
