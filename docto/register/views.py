from rest_framework.views import APIView
from django.contrib.auth import authenticate, get_user_model    
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.contrib.auth.hashers import make_password, check_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
import re
import random
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, OtpToken
from .serializers import UserSerializer, DoctorSerializer
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes


class RegisterView(APIView):
    """
    API view for user registration.
    """

    def post(self, request, *args, **kwargs):
        # Extract data from the request
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        clinic_id = request.data.get('clinic_id')
        phone_number = request.data.get('phone_number')
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')
        
        
        print(first_name)
        print(last_name)
        print(clinic_id)
        print(phone_number)
        print(email)
        print(password)
        print(confirm_password)
        # Validate input
        if not all([first_name, last_name, clinic_id, phone_number, email, password, confirm_password]):
            raise ValidationError("All fields are required.")

        # Validate email format
        try:
            validate_email(email)
        except DjangoValidationError:
            raise ValidationError("Invalid email format.")

        # Password validation
        if len(password) < 8 or not re.search(r'\d', password) or not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise ValidationError(
                "Password must be at least 8 characters long, include at least one number, and one special character."
            )

        # Phone number validation
        if len(phone_number) != 10 or not phone_number.isdigit():
            raise ValidationError("Phone number must be 10 digits.")

        # Confirm password validation
        if password != confirm_password:
            raise ValidationError("Passwords do not match.")

        # Check if email, phone number, or clinic ID already exists
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already registered."}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(phone_number=phone_number).exists():
            return Response({"error": "Phone number already registered."}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(clinic_id=clinic_id).exists():
            return Response({"error": "Clinic ID already registered."}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            clinic_id=clinic_id,
            phone_number=phone_number,
            email=email,
            password=make_password(password),  # Hash the password
        )

        # Return success response
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# class AuthCheckView(APIView):
#     def get(self, request):
#         # ✅ Extract token from cookies
#         access_token = request.COOKIES.get("access_token")
#         if not access_token:
#             return JsonResponse({"error": "No access token found"}, status=401)

#         try:
#             # ✅ Manually validate token
#             token = AccessToken(access_token)  
#             return Response({"message": "User is authenticated", "user_id": token["user_id"]})
#         except Exception:
#             return JsonResponse({"error": "Invalid or expired token"}, status=401)



class CheckSessionView(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response(
                {
                    "isAuthenticated": True,
                    "user": {
                        "id": request.user.id,
                        "name": f"{request.user.first_name} {request.user.second_name}",
                        "email": request.user.email,
                    },
                },
                status=status.HTTP_200_OK,
            )
        return Response({"isAuthenticated": False}, status=status.HTTP_200_OK)


class LoginView(APIView):
    """
    API view for user login. Returns JWT tokens as cookies.
    """

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        clinic_id = request.data.get("clinic_id")

        # Validate input
        if not all([email, password, clinic_id]):
            raise ValidationError("Email, password, and clinic ID are required.")

        try:
            user = User.objects.get(email=email, clinic_id=clinic_id)
        except User.DoesNotExist:
            raise AuthenticationFailed("Invalid email, password, or clinic ID.")

        # Check password
        if not check_password(password, user.password):
            raise AuthenticationFailed("Invalid email, password, or clinic ID.")

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # Prepare response
        response = Response(
            {
                'user': f"{user.first_name} {user.last_name}",
                'clinic_id': user.clinic_id,
                "refresh": str(refresh),
                "access": str(access_token),
            }
        )

        # Set cookies with tokens
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=True,  # Set to True if using HTTPS
            samesite='Lax',
            max_age=60 * 60 * 24 * 7,  # 1 week
        )
        response.set_cookie(
            key='access_token',
            value=str(access_token),
            httponly=True,
            secure=True,  # Set to True if using HTTPS
            samesite='Lax',
            max_age=60 * 60,  # 1 hour
        )

        return response


class CheckSessionView(APIView):
    """
    API view to check if the user is authenticated.
    """

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response(
                {
                    "isAuthenticated": True,
                    "user": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        return Response({"isAuthenticated": False}, status=status.HTTP_200_OK)


class LogoutView(APIView):
    """
    API view for user logout. Invalidates the refresh token.
    """

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({"error": _("Refresh token is required.")}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": _("Logged out successfully.")}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": _("Invalid or expired token.")}, status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):
    """
    API view for changing user password.
    """

    def put(self, request, *args, **kwargs):
        email = request.data.get('email')
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        # Validate input
        if not all([email, old_password, new_password, confirm_password]):
            raise ValidationError("All fields are required.")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("User with this email does not exist.")

        # Check old password
        if not check_password(old_password, user.password):
            raise AuthenticationFailed("Old password is incorrect.")

        # Check new password complexity
        if len(new_password) < 8 or not re.search(r'\d', new_password) or not re.search(r'[!@#$%^&*(),.?":{}|<>]', new_password):
            raise ValidationError(
                "Password must be at least 8 characters long, include at least one number, and one special character."
            )

        # Check if new password matches confirm password
        if new_password != confirm_password:
            raise ValidationError("New password and confirm password do not match.")

        # Update password
        user.password = make_password(new_password)
        user.save()

        return Response({"detail": "Password successfully changed."}, status=status.HTTP_200_OK)


class SendOtp(APIView):
    """
    API view for sending OTP for email verification.
    """

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Remove any existing OTPs for this email
        OtpToken.objects.filter(email=email).delete()

        # Generate a new OTP
        otp_code = str(random.randint(100000, 999999))  # 6-digit OTP
        otp_expires_at = timezone.now() + timezone.timedelta(minutes=settings.OTP_EXPIRY_MINUTES)
        otp = OtpToken.objects.create(email=email, otp_code=otp_code, otp_expires_at=otp_expires_at)

        # Send OTP email
        send_mail(
            subject="Your OTP Code",
            message=f"Your OTP code is {otp.otp_code}. It expires in {settings.OTP_EXPIRY_MINUTES} minutes.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False
        )

        return Response({"message": "OTP sent to email"}, status=status.HTTP_200_OK)


class ForgotPassword(APIView):
    """
    API view for resetting password using OTP.
    """

    def post(self, request):
        email = request.data.get("email")
        new_password = request.data.get("new_password")
        otp_code = request.data.get("otp_code")

        if not all([email, new_password, otp_code]):
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            otp = OtpToken.objects.get(email=email, otp_code=otp_code)
        except OtpToken.DoesNotExist:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        if timezone.now() > otp.otp_expires_at:
            return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(email=email)
        user.password = make_password(new_password)
        user.save()

        return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)


class DoctorDetails(APIView):
    """
    API view to retrieve doctor details by clinic ID.
    """

    def get(self, request, clinic_id):
        try:
            doctor = User.objects.get(clinic_id=clinic_id)
            serializer = DoctorSerializer(doctor)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)