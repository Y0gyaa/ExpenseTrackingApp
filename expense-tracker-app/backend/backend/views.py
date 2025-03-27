from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer
from rest_framework.generics import DestroyAPIView
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.response import Response

User = get_user_model()

"""User is created (POST), response is username,
     email and user_id"""
class RegisterUserView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny] 


"""User log in (POST) with username and password 
    body. Response is Token."""
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})

        return Response({"error": "Invalid credentials"}, status=400)    


"""(Delete) user with id and Authorization headers,
     Token <token>"""
class DeleteUserView(DestroyAPIView):
    queryset = User.objects.all()
    lookup_field = 'id'  
    permission_classes = [IsAuthenticated]  


"""Testing playing around; Will delete later"""
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": f"Hello {request.user.username}, you are authenticated!"})