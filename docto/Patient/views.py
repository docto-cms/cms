# from django.shortcuts import get_object_or_404
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Patient
# from .serializers import *



# class PatientDetailAPIView(APIView):

#     def get(self, request, pk=None):
#         if pk is None:  # List all patients
#             patients = Patient.objects.all()
#             serializer = PatientSerializer(patients, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:  # Retrieve a single patient
#             patient = get_object_or_404(Patient, pk=pk)
#             serializer = PatientSerializer(patient)
#             return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request, *args, **kwargs):
#         serializer = PatientSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         patient = get_object_or_404(Patient, pk=pk)
#         serializer = PatientSerializer(patient, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         patient = get_object_or_404(Patient, pk=pk)
#         patient.delete()
#         return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# #Quick entry

# class BasicInfoAPIView(APIView):
#     def post(self,request):
#         serializer = BasicInfoSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(
#                 {
#                     "message":"created successfully!",
#                     "data": serializer.data
#                 },
#                 status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Patient
<<<<<<< HEAD
from .serializers import PatientSerializer, BasicInfoSerializer

=======
from .serializers import *
from .models import Doctor
>>>>>>> 6b8f0baa9b89897ba75c58cad2dacfda55531f43

class PatientDetailAPIView(APIView):
    """
    API for handling Patient details (Retrieve, Update, Delete).
    """

    def get(self, request, pk=None):
        if pk is None:  
            patients = Patient.objects.all()

            serializer = PatientSerializer(patients, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:  # Retrieve a single patient
            patient = get_object_or_404(Patient, pk=pk)
            serializer = PatientSerializer(patient)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Patient created successfully!", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
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
<<<<<<< HEAD
        serializer = PatientSerializer(patient, data=request.data, partial=True)  # Partial update allowed
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Patient updated successfully!", "data": serializer.data},
                status=status.HTTP_200_OK
            )
=======
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
>>>>>>> 70b7833949c75b31d479ccaf3ec1036f87ac72fe
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        patient = get_object_or_404(Patient, pk=pk)
        patient.delete()
        return Response({"message": "Patient deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# Quick Entry API
# class BasicInfoAPIView(APIView):
#     """
#     API to handle Quick Entry of patient basic info.
#     """

#     def post(self, request):
#         serializer = BasicInfoSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(
#                 {
#                     "message": "Patient basic info created successfully!",
#                     "data": serializer.data
#                 },
#                 status=status.HTTP_201_CREATED
#             )
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BasicInfoAPIView(APIView):
    """
    API to handle Quick Entry of patient basic info.
    """

    def post(self, request):
        serializer = BasicInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Patient basic info created successfully!",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

<<<<<<< HEAD

=======
class DoctorDetailAPIView(APIView):
    def get(self,request):
        doctor=Doctor.objects.all()
        serializer=DocterSerializer(doctor,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
>>>>>>> 70b7833949c75b31d479ccaf3ec1036f87ac72fe
