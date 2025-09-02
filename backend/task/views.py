from rest_framework import views, permissions, response, status, viewsets
from .models import Task
from .serializers import TaskModelSerializer


class TaskView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = TaskModelSerializer(data=request.data)
        if serializer.is_valid():
            if request.user:
                serializer.save(owner=request.user)
                return response.Response(
                    serializer.data, status=status.HTTP_201_CREATED
                )

    def get(self, request):
        tasks = Task.objects.filter(owner=request.user)
        serializer = TaskModelSerializer(tasks, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskModelSerializer

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
