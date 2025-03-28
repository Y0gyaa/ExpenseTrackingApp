from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class LoginUserTestCase(APITestCase):

    def setUp(self):
        """Create a test user setup"""
        self.login_url = "/login/"
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="password123"
        )
        

    def test_login_succes(self):
        """Test if user can login with credentials successfully"""
        login_data = {
            "username":"testuser",
            "password": "password123"
        }
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        

    def test_invalid_login(self):
        """Test if invalid credentials throw expected error"""
        invalid_login_data = {
            "username":"testuser",
            "password": "badpassword"
            }
        response = self.client.post(self.login_url, invalid_login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["error"], "Invalid credentials")


    def test_login_missing_fields(self):
        """Test login with missing password and username."""
        response = self.client.post(self.login_url, {"username": "testuser"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        res = self.client.post(self.login_url, {"password": "somepassword"}, format="json")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        

    def test_login_unauthorized_access(self):
        """Test unauthorized access with no data given"""
        response = self.client.post(self.login_url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_login_token_creation(self):
        """Ensure a token is created on first login."""
        login_data = {
            "username": "testuser",
            "password": "password123"
        }
        response = self.client.post(self.login_url, login_data, format="json")
        token = Token.objects.get(user=self.user)  # token from DB
        self.assertEqual(response.data["token"], token.key) 