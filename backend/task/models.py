from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Task(models.Model):
    title = models.CharField(blank=False, null=False, max_length=255)
    description = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
