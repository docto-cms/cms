from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from Patient.models import *
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_datetime
from django.utils.timezone import is_naive, make_aware
from datetime import timedelta
from django.db.models import Q
from django.utils.timezone import now
class AppointmentMobileAPIView(APIView):

    def get(self, request, appointment_id=None):
        """Retrieve all appointments or a specific one."""
        if appointment_id:
            try:
                appointment = PatientAppointment.objects.get(id=appointment_id)
                serializer = PatientAppointmentSerializer(appointment)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except PatientAppointment.DoesNotExist:
                return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)

        appointments = PatientAppointment.objects.all()
        serializer = PatientAppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def post(self, request, *args, **kwargs):
        serializer = PatientAppointmentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        
    def put(self, request, appointment_id):
        """Update appointment status and move it to Appointment model if accepted."""
        try:
            appointment = PatientAppointment.objects.get(id=appointment_id)
        except PatientAppointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = AppointmentUpdateSerializer(appointment, data=request.data, partial=True)
        if serializer.is_valid():
            new_status = serializer.validated_data.get("status")
            print(new_status)
            if new_status == "Accept":
                if not appointment.doctor:
                    return Response({"error": "Doctor field is missing in appointment"}, status=status.HTTP_400_BAD_REQUEST)

                doctor_name = appointment.doctor
                appointment_date = appointment.date
                if appointment_date is None:
                    return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

                duration = appointment.duration

                doctor_instance = get_object_or_404(Doctor, firstname=doctor_name)

                if is_naive(appointment_date):
                    appointment_date = make_aware(appointment_date)

                appointment_end_time = appointment_date + timedelta(minutes=duration)

                statusError = Appointments.objects.filter(status__in=['Scheduled', 'Waiting', 'Engaged'])

                overlapping_doctor = statusError.filter(
                    Doctor=doctor_instance,
                    Date__lt=appointment_end_time,
                    Date__gte=appointment_date - timedelta(minutes=(duration - 1))
                )

                if overlapping_doctor.exists():
                    appointment.status = "Decline"
                    return Response({"error": "Doctor is not available at this time"}, status=status.HTTP_400_BAD_REQUEST)

                # Ensure doctor_instance is included while creating the patient
                patient, created = Patient.objects.get_or_create(
                    Email=appointment.email,
                    defaults={
                        "FirstName": appointment.first_name,
                        "LastName": appointment.last_name,
                        "PhoneNumber": appointment.mobile_number,
                        "Doctor": doctor_instance,  # Ensure this field is assigned
                    },
                )

                overlapping_patient = statusError.filter(
                    Patient=patient,
                    Date__lt=appointment_end_time,
                    Date__gte=appointment_date - timedelta(minutes=(duration - 1))
                )

                if overlapping_patient.exists():
                    appointment.status = "Decline"
                    return Response({"error": "Patient is already booked at this time"}, status=status.HTTP_400_BAD_REQUEST)

                appointment_obj = Appointments.objects.create(
                    Patient=patient,
                    Doctor=doctor_instance,
                    Treatment=appointment.treatment,
                    Notes=appointment.notes,
                    Date=appointment_date,
                    Duration=duration,
                )
                appointment.delete()


                return Response(
                    {
                        "message": "Appointment accepted and moved to Appointment model.",
                        "appointment_id": appointment_obj.id,
                        "patient_id": patient.RegistrationId,
                        "new_patient": created,
                    },
                    status=status.HTTP_200_OK
                )
            
            if new_status=="Decline":
                appointment.delete()
                return Response({"message":"Delete Successfully"})

            return Response({"message": "Appointment status updated"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

    # def delete(self, request, appointment_id):
    #     """Delete an appointment."""
    #     try:
    #         appointment = PatientAppointment.objects.get(id=appointment_id)
    #         appointment.delete()
    #         return Response({"message": "Appointment deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    #     except PatientAppointment.DoesNotExist:
    #         return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)

    
class EditAppointmentMobileAPIView(APIView):
    """
    API to edit doctor and date for a specific appointment.
    """

    def put(self, request, appointment_id):
        """Update the doctor and/or date of an appointment."""
        appointment = get_object_or_404(PatientAppointment, id=appointment_id)

        doctor = request.data.get("doctor") 
        new_date_str = request.data.get("date") 

        
        if doctor:
            doctor = Doctor.objects.filter(id=doctor).first()
            if not doctor:
                return Response({"error": "Invalid doctor firstname"}, status=status.HTTP_400_BAD_REQUEST)
            appointment.doctor = doctor  

        if new_date_str:
            parsed_date = parse_datetime(new_date_str)
            if parsed_date is None:
                return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)
            appointment.date = parsed_date 

        appointment.save()

        data = {
            "id": appointment.id,
            "doctor_name": appointment.doctor.firstname if appointment.doctor else "No Doctor Assigned", 
            "appointment_date": appointment.date.strftime('%Y-%m-%d %H:%M:%S') 
        }

        return Response({"message": "Appointment updated", "data": data}, status=status.HTTP_200_OK)
    

class AppointmentAPIView(APIView):
    """
    View to list all appointments or create a new one.
    """
    def get(self, request):
        appointments = Appointments.objects.exclude(status='Canceled') 
        serializer = AppointmentGetSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):

        patient_data = request.data.get("Patient", {})
        doctor_name = request.data.get("Doctor")
        appointment_data = request.data

        appointment_date = parse_datetime(appointment_data.get("Date"))
        if appointment_date is None:
            return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

        if appointment_date < now():
            return Response({"error": "Appointment date should be in the future"}, status=status.HTTP_400_BAD_REQUEST)
       
        if is_naive(appointment_date):
            appointment_date = make_aware(appointment_date)

        duration = int(appointment_data.get("Duration", 0))

      
        doctor_instance = get_object_or_404(Doctor, id=doctor_name)

    
        appointment_end_time = appointment_date + timedelta(minutes=duration)

        statusError = Appointments.objects.filter(status__in=['Scheduled', 'Waiting', 'Engaged'])
        print(statusError)

        overlapping_doctor = statusError.filter(
            Doctor=doctor_instance,
            Date__lt=appointment_end_time,
            Date__gte=appointment_date - timedelta(minutes=(duration - 1))
        )
        print(overlapping_doctor)
        if overlapping_doctor.exists():
            return Response({"error": "Doctor is not available at this time"}, status=status.HTTP_400_BAD_REQUEST)

       
        patient_instance, _= Patient.objects.get_or_create(
            FirstName=patient_data.get("FirstName"),
            LastName=patient_data.get("LastName"),
            defaults={
                "PhoneNumber": patient_data.get("PhoneNumber"),
                "Email": patient_data.get("Email"),
                "Age": patient_data.get("Age"),
                "Gender": patient_data.get("Gender"),
                "City": patient_data.get("City"),
                "Doctor": doctor_instance,
            },
        )

        overlapping_patient = statusError.filter(
            Patient=patient_instance
        ).filter(
            Q(Date__lt=appointment_end_time, Date__gte=appointment_date) | 
            Q(Date__lte=appointment_date, Date__gt=appointment_date)
        )

        overlapping_patient = statusError.filter(
            Patient=patient_instance
        ).filter(
            Date__lt=appointment_end_time,
            Date__gte=appointment_date - timedelta(minutes=(duration-1)),
        )

        if overlapping_patient.exists():
            return Response({"error": "Patient is not available at this time"}, status=status.HTTP_400_BAD_REQUEST)

        
        appointment = Appointments.objects.create(
            Patient=patient_instance,  
            Doctor=doctor_instance,
            Date=appointment_date,
            Duration=duration,
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
        
        
# 127.0.0.1:8000/appointment/count/
class AppointmentTotalCountAPIView(APIView):

    def get(self, request):
        try:
            appointmentscount = Appointments.objects.filter()
            appointment_counts = appointmentscount.count()

            return Response({
                'total': appointment_counts,
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
       

# http://127.0.0.1:8000/appointment/appointmentdelete/?patient_name=Akki&mobile_no=9639877890&date=2024-02-05T10:31:00Z
class AppointmentDeleteView(APIView):

    def delete(self, request):
        try:
            patient_name = request.query_params.get('patient_name')
            mobile_no = request.query_params.get('mobile_no')
            date_str = request.query_params.get('date')


            if not all([patient_name, mobile_no, date_str]):
                return Response(
                    {'error': 'Missing required parameters: patient_name, mobile_no, and date'},
                    status=status.HTTP_400_BAD_REQUEST
                )


            appointment_date = parse_datetime(date_str)
            if appointment_date is None:
                return Response(
                    {'error': 'Invalid date format'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                patient = Patient.objects.get(
                    FirstName=patient_name,
                    PhoneNumber=mobile_no
                )
            except Patient.DoesNotExist:
                return Response(
                    {'error': 'Patient not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            try:
                appointment = Appointments.objects.get(
                    Patient=patient,
                    Date=appointment_date
                )

            except Appointments.DoesNotExist:
                return Response(
                    {'error': 'Appointment not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            appointment.status = 'Canceled'
            appointment.save()

            return Response(
                {'message': 'Appointment canceled successfully'},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {'error': f'An unexpected error occurred: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class UpdateAppointmentStatusAPIView(APIView):
    
    def patch(self, request, appointment_id):
        try:
            new_status = request.data.get('status')
            print(new_status)
            if new_status not in ['Canceled', 'Done', 'Engaged', 'Waiting', 'Scheduled']: 
                return Response({'error': 'Invalid status value'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                appointment = Appointments.objects.get(id=appointment_id)
            except Appointments.DoesNotExist:
                return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)

            if appointment.status == 'Done':
                return Response({'done': 'Appointment is already done. It cannot be changed.'}, status=status.HTTP_400_BAD_REQUEST)

            if appointment.status == 'Engaged':
                if new_status not in ['Done']:
                    return Response({'done': 'Engaged appointments can only be changed to Done or Canceled'}, status=status.HTTP_400_BAD_REQUEST)

            if appointment.status == 'Waiting': 
                if new_status not in ["Engaged"]:
                    return Response({'done': 'Waiting appointments can only be changed to Engaged'}, status=status.HTTP_400_BAD_REQUEST)

            if appointment.status == 'Scheduled': 
                if new_status not in ['Waiting',"Canceled"]: 
                    return Response({'done': 'Scheduled appointments can only be changed to Engaged or Canceled'}, status=status.HTTP_400_BAD_REQUEST)

            if appointment.status == 'Canceled': 
                return Response({'done': 'Canceled appointments cannot be changed'}, status=status.HTTP_400_BAD_REQUEST)

            appointment.status = new_status
            appointment.save()

            return Response({
                'patient_name': appointment.Patient.FirstName,
                'doctor_name': appointment.Doctor.firstname,
                'status': dict(Appointments.STATUS_CHOICES).get(appointment.status),
                'Date': appointment.Date,
                'Duration': appointment.Duration
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# patentappointmentbydoctorid
class patentappointmentbydoctorid(APIView):
    def get(self, request, id):
        try:
            doctor = Doctor.objects.get(id=id)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

        appointments = PatientAppointment.objects.filter(doctor=doctor)
        serializer = PatientAppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class DocterAppointmentByDoctorId(APIView):
    def get(self, request, id):
        today = now().date()
        try:
            doctor = Doctor.objects.get(id=id)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

        appointments = Appointments.objects.filter(Doctor=doctor ,Date__date=today)
        serializer = AppointmentGetSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TodayAppointmentsAPIView(APIView):
    def get(self, request):
        today = now().date()
        appointments = Appointments.objects.filter(Date__date=today)
        serializer = AppointmentGetSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TotalCanceledAppointments(APIView):
    def get(self, request):
        appointments = Appointments.objects.filter(status='Canceled')
        serializer = AppointmentGetSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
            
class UpcomingAppointmentsWeek(APIView):
    def get(self, request):
        today = now().date()
        next_week = today + timedelta(days=7)
        appointments = Appointments.objects.filter(Date__date__range=[today, next_week],status__in=['Scheduled', 'Waiting', 'Engaged'])
        serializer = AppointmentGetSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MissedAppointments(APIView):
    def get(self, request):
        now_time = now()
        today=now().date()
        appointments = Appointments.objects.filter(Date__lt=now_time, status='Scheduled',Date__date=today)  
        serializer = AppointmentGetSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UpComingAppointmentsToday(APIView):
    def get(self, request):
        now_time = now()
        today=now().date()
        appointments = Appointments.objects.filter(Date__gt=now_time, status='Scheduled',Date__date=today)  
        serializer = AppointmentGetSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# calculating appointments by ["January", "February", "March", "April", "May", "June","august","September","October","November","December"]
class AppointmentsByMonth(APIView):
    def get(self, request):
        appointments = Appointments.objects.all()
        months = ["January", "February", "March", "April", "May", "June","august","September","October","November","December"]
        data = {}
        for month in months:
            data[month] = appointments.filter(Date__month=months.index(month) + 1).count()
        return Response(data, status=status.HTTP_200_OK)
