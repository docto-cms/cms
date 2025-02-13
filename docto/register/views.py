from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
import re
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.translation import gettext_lazy as _
from .models import *
from django.contrib.auth.hashers import check_password
from django.utils import timezone
from django.core.mail import send_mail
import random


class RegisterView(APIView):
    """
    API view for user registration.
    """

    def post(self, request, *args, **kwargs):

        # Extract data from the request
        first_name = request.data.get('first_name')
        second_name = request.data.get('second_name')
        clinic_id = request.data.get('clinic_id')
        phone_number = request.data.get('phone_number')
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')

        # Validate input
        if not password or not email or not first_name or not second_name or not clinic_id or not phone_number or not confirm_password:
            raise ValidationError("All details are required fields.")

        # Password validation (example rules: minimum 8 characters, must include a number and a special character)
        if len(password) < 8 or not re.search(r'\d', password) or not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise ValidationError(
                "Password must be at least 8 characters long, include at least one number, and one special character."
            )
        
        # mobile number validation
        if len(phone_number)<10 or len(phone_number)>10:
            raise ValidationError(
                "Phone Number should be 10 digits"
            )
        
        # checking confirm password
        if password!=confirm_password:
            raise ValidationError(
                "The password and confirm password should be same"
            )
        
        # Check if email or phone number or clinic id already exists
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already registered."}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(phone_number=phone_number).exists():
            return Response({"error": "phone number already registered."}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(clinic_id=clinic_id).exists():
            return Response({"error": "clinic id already registered."}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        user = User.objects.create(
            first_name=first_name,
            second_name=second_name,
            clinic_id=clinic_id,
            phone_number=phone_number,
            email=email,
            password=make_password(password),  # Hash the password
        )

        # Return success response
        return Response(
            {
                "id": user.id,
                "name": user.first_name+user.second_name,
                "email": user.email,
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):

    """
    API view for user login. It returns a JWT token upon successful authentication.
    """

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        clinic_id = request.data.get('clinic_id')

        # Validate input
        if not email or not password or not clinic_id:
            raise ValidationError("email , password and clinic_id are required fields.")

        # Authenticate user
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("Invalid username or password.")

        # Manually hash and check the password
        if not check_password(password, user.password):
            raise AuthenticationFailed("Invalid username or password.")

        # Create JWT token
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        # Return the tokens in response
        return Response(
            {
                'user':user.first_name+user.second_name,
                'refresh': str(refresh),
                'access': str(access_token),
            },
            status=status.HTTP_200_OK
        )


class LogoutView(APIView):
    """
    API view for user logout.
    """

    def post(self, request, *args, **kwargs):
        # Extract the refresh token from the request
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({"error": _("Refresh token is required.")}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": _("Logged out successfully.")}, status=status.HTTP_200_OK)

        except Exception as e:
            # Log the error with traceback for debugging
            import traceback
            print(f"Logout error: {str(e)}") 
            print(traceback.format_exc())
            return Response({"error": _("Invalid or expired token.")}, status=status.HTTP_400_BAD_REQUEST)

class ChangePassword(APIView):

    def put(self, request, *args, **kwargs):
        email = request.data.get('email')
        old_password=request.data.get("old_password")
        new_password=request.data.get("new_password")
        confirm_password = request.data.get('confirm_password')
        user = User.objects.get(email=email)

        if not email or not old_password or not new_password or not confirm_password:
            raise ValidationError("email , password and clinic_id are required fields.")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("User with this email does not exist.")

        if not check_password(old_password, user.password):
            raise AuthenticationFailed("old password is incorrect")

        if check_password(new_password, user.password):
            raise AuthenticationFailed("new pasword is same as old password")
        
        if new_password!=confirm_password:
            raise ValidationError("new_password & confirm_password should be same ")

        user.password=make_password(new_password)
        user.save()
        return Response({"detail": "Password successfully changed."}, status=status.HTTP_200_OK)

class send_otp(APIView):
    def post(self,request):
        """ Generates and sends an OTP for email verification before user creation """
        email = request.data.get("email")

        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Remove any existing OTPs for this email
        OtpToken.objects.filter(email=email).delete()

        # Generate a new OTP
        otp_code = str(random.randint(100000, 999999))  # 6-digit OTP
        otp = OtpToken.objects.create(email=email, otp_code=otp_code, otp_expires_at=timezone.now() + timezone.timedelta(minutes=5))

        # Send OTP email
        send_mail(
            subject="Your OTP Code",
            message=f"Your OTP code is {otp.otp_code}. It expires in 5 minutes.",
            from_email="your-email@gmail.com",
            recipient_list=[email],
            fail_silently=False
        )

        return Response({"message": "OTP sent to email"}, status=status.HTTP_200_OK)
    
class forgotPassword(APIView):
    def post(self,request):
        email = request.data.get("email")
        new_password = request.data.get("new_password")
        otp_code = request.data.get("otp_code")

        if not email or not new_password or not otp_code:
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
    