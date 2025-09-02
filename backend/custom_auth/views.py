from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import transaction


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            username = request.data.get("username")
            password = request.data.get("password")

            if not username or not password:
                return Response(
                    {"error": "Username and password required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = authenticate(username=username, password=password)
            if user is not None:
                if not user.is_active:
                    return Response(
                        {"error": "User is disabled"}, status=status.HTTP_403_FORBIDDEN
                    )
                refresh = RefreshToken.for_user(user)

                response_data = {
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "tokens": {
                        "access": str(refresh.access_token),
                        "refresh": str(refresh),
                    },
                }
                return Response(response_data, status=status.HTTP_200_OK)

        except:
            return Response(
                {"error": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")
        email = request.data.get("email")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")

        if password != confirm_password:
            return Response(
                {"error": "password and confirm_password is nor equal"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            with transaction.atomic():
                user = User.objects.create_user(
                    username=username,
                    password=password,
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                )

                tokens = RefreshToken.for_user(user)

            response_data = {
                "message": "User created successfully",
                "user": {
                    "username": username,
                    "first_name": first_name,
                    "last_name": last_name,
                },
                "tokens": tokens,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        except:
            return Response(
                {"error": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class TokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user

            return Response(
                {
                    "valid": True,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"valid": False, "error": "Invalid token"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class RefreshTokenView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")

            if not refresh_token:
                return Response(
                    {"error": "Refresh token is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                # Validate and decode refresh token
                refresh = RefreshToken(refresh_token)

                # Generate new access token
                access_token = refresh.access_token

                return Response(
                    {
                        "access_token": str(access_token),
                    },
                    status=status.HTTP_200_OK,
                )

            except TokenError as e:
                return Response(
                    {"error": "Invalid refresh token"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        except Exception as e:
            return Response(
                {"error": "An error occurred during token refresh"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
