from rest_framework.serializers import ModelSerializer
from .models import *


class TaskModelSerializer(ModelSerializer):

    class Meta:
        model = Task
        fields = ["id", "title", "description", "owner", "completed"]
        read_only_fields = ["id", "owner"] 
