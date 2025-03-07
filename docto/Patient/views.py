from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from django.utils.timezone import now

class PatientDetailAPIView(APIView):

    def get(self, request, pk=None):
        if pk is None:  
            patients = Patient.objects.all()

            serializer = PatientSerializer(patients, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:  
            patient = get_object_or_404(Patient, pk=pk)
            serializer = PatientSerializer(patient)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def put(self, request, pk):
    #     print("Received Data from Frontend:", request.data)
    #     patient = get_object_or_404(Patient, pk=pk)
    #     serializer = PatientSerializer(patient, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         print("Data is valid")
    #         serializer.save()
    #         print("Data saved")
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        print("Received Data from Frontend:", request.data)
        patient = get_object_or_404(Patient, pk=pk)
        serializer = PatientSerializer(patient, data=request.data, partial=True)
        
        if serializer.is_valid():
            print("Data is valid")
            try:
                serializer.save()
                print("Data saved")
                print(serializer.data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                print("Error saving data:", str(e))  # Log the error
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        print("Validation Errors:", serializer.errors)  # Log validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        patient = get_object_or_404(Patient, pk=pk)
        patient.delete()
        return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


#Quick entry

class BasicInfoAPIView(APIView):
    def post(self,request):
        serializer = BasicInfoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message":"created successfully!",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorDetailAPIView(APIView):
    def get(self,request):
        doctor=Doctor.objects.all()
        serializer=DocterSerializer(doctor,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class TodaysPatientListAPIView(APIView):
    def get(self,request):
        today = now().date()
        today_patients=Patient.objects.filter(created_at__date=today)
        serializer=PatientSerializer(today_patients,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

# patients before this month
class PatientsBeforeThisMonth(APIView):
    def get(self,request):
        today = now().date()
        patients=Patient.objects.filter(created_at__month__lt=today.month)
        serializer=PatientSerializer(patients,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
# new patients of this month
class NewPatientsOfMonth(APIView):
    def get(self,request):
        today = now().date()
        new_patients=Patient.objects.filter(created_at__month=today.month)
        serializer=PatientSerializer(new_patients,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
