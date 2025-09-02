from django.urls import path, include
from .views import *

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("signup/", SignupView.as_view(), name="signup"),
    path("token/", TokenView.as_view(), name="token"),
    path("refresh/", RefreshTokenView.as_view(), name="refresh-token")
]
