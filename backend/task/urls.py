from rest_framework import routers
from .views import *
from django.urls import path, include

router = routers.SimpleRouter()
router.register(r"", TaskViewSet, basename="task")

urlpatterns = [
    path("tasks-view", TaskView.as_view(), name="tasks"),
    path("", include(router.urls)),
]
