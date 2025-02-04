from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
<<<<<<< HEAD
from .models import Appointment, Doctor, PatientAppointment
=======
from .models import *
>>>>>>> main
from .serializers import *
from Patient.models import Patient

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

    def post(self, request):

        """Create a new appointment."""
        serializer = PatientAppointmentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Appointment created", "data": serializer.data}, status=status.HTTP_201_CREATED)
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

            if new_status == 1:
                doctor = appointment.doc

                doctor_conflict = Appointments.objects.filter(
                    doctor=doctor, date=appointment.date, duration=appointment.duration
                ).exists()

                if doctor_conflict:
                    return Response(
                        {"error": "Doctor is not available at this time"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                patient, created = Patient.objects.get_or_create(
                    Email=appointment.email,
                    defaults={
                        "FirstName": appointment.first_name,
                        "LastName": appointment.last_name,
                        "PhoneNumber": appointment.mobile_number,
                    },
                )

                
                patient_conflict = Appointments.objects.filter(
                    patient=patient, date=appointment.date, duration=appointment.duration
                ).exists()

                if patient_conflict:
                    appointment.status = 0
                    appointment.save()
                    return Response(
                        {"error": "Patient is already booked at this time"},
                        status=status.HTTP_400_BAD_REQUEST
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
                    status=status.HTTP_200_OK
                )

            appointment.status = new_status
            appointment.save()
            return Response({"message": "Appointment status updated"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, appointment_id):
        """Delete an appointment."""
        try:
            appointment = PatientAppointment.objects.get(id=appointment_id)
            appointment.delete()
            return Response({"message": "Appointment deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except PatientAppointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)


class EditAppointmentMobileAPIView(APIView):

    def put(self, request, appointment_id):
        """Edit doctor and date for a specific appointment."""
        try:
            appointment = PatientAppointment.objects.get(id=appointment_id)
        except PatientAppointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)

        doctor_firstname = request.data.get("doctor") 
        new_date = request.data.get("date")

        if doctor_firstname:
            try:

                doctor = Doctor.objects.get(firstname=doctor_firstname)
                appointment.doc = doctor  
            except Doctor.DoesNotExist:
                return Response({"error": "Invalid doctor firstname"}, status=status.HTTP_400_BAD_REQUEST)

        if new_date:
            try:
                appointment.date = new_date 
            except Exception as e:
                return Response({"error": f"Invalid date format. {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        appointment.save()

        data = {
            "id": appointment.id,
            "doctor_name": appointment.doc.firstname if appointment.doc else "No Doctor Assigned", 
            "appointment_date": appointment.date.strftime('%Y-%m-%d %H:%M:%S')
        }

        return Response({"message": "Appointment updated", "data": data}, status=status.HTTP_200_OK)
        

class AppointmentAPIView(APIView):
    def post(self, request):
        serializer = AppointmentCreateSerializer(data=request.data)
        
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        appointments = Appointments.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

     
class DoctorAppointmentsDatesAPIView(APIView):

    def get(self, request):
        try:
            doctor_name = request.query_params.get('doctor_name')

            if not doctor_name:
                return Response({'error': 'doctor_name is required'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                doctor = Doctor.objects.get(firstname=doctor_name)
            except Doctor.DoesNotExist:
                return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

            appointments = Appointments.objects.filter(doctor=doctor).exclude(status__in=[1, 0]).values('date', 'duration')
            appointment_count = appointments.count()

            if not appointments:
                return Response({
                    'doctor_name': doctor.firstname,
                    'appointment_count': 0,
                    'appointments': []
                }, status=status.HTTP_200_OK)

            appointment_details = [
                {
                    'datetime': appointment['date'],
                    'duration': appointment['duration']
                }
                for appointment in appointments
            ]

            return Response({
                'doctor_name': doctor.firstname,
                'appointment_count': appointment_count,
                'appointments': appointment_details
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AppointmentDeleteView(APIView):

    def delete(self, request):
        try:
            patient_name = request.query_params.get('patient_name')
            mobile_no = request.query_params.get('mobile_no')
            date = request.query_params.get('date')

            if not all([patient_name, mobile_no, date]):
                return Response(
                    {'error': 'Missing required parameters: patient_name, mobile_no, and date'},
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
                    patient=patient,
                    date=date
                )
            except Appointments.DoesNotExist:
                return Response(
                    {'error': 'Appointment not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

        
            appointment.status = 0 
            appointment.save()
            # appointment.delete()

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

            if new_status not in [0, 1, 2, 3, 4]: 
                return Response({'error': 'Invalid status value'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                appointment = Appointments.objects.get(id=appointment_id)
            except Appointments.DoesNotExist:
                return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)

            if appointment.status == 1:
                return Response({'error': 'Appointment is already done. It cannot be changed.'}, status=status.HTTP_400_BAD_REQUEST)

            if appointment.status == 2:
                if new_status not in [1, 0]:
                    return Response({'error': 'Engaged appointments can only be changed to Done or Canceled'}, status=status.HTTP_400_BAD_REQUEST)

            if appointment.status == 3: 
                if new_status != 2:
                    return Response({'error': 'Waiting appointments can only be changed to Engaged'}, status=status.HTTP_400_BAD_REQUEST)

            if appointment.status == 4: 
                if new_status not in [2, 3]: 
                    return Response({'error': 'Scheduled appointments can only be changed to Engaged or Waiting'}, status=status.HTTP_400_BAD_REQUEST)

            appointment.status = new_status
            appointment.save()

            return Response({
                'id': appointment.id,
                'patient_name': appointment.patient.FirstName,
                'doctor_name': appointment.doctor.firstname,
                'status': dict(Appointments.STATUS_CHOICES).get(appointment.status),
                'date': appointment.date,
                'duration': appointment.duration
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        