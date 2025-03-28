from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token

User = get_user_model()

class LogoutTestCase(APITestCase):
    def setUp(self):
        """Create a test user and log in before each test"""
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="testpassword123"
        )
        self.token = Token.objects.create(user=self.user)  # Create token
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)  # auth header
        self.logout_url = "/logout/"  


    def test_logout_success(self):
        """Test successful logout and token is deleted"""
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Logged out successfully")
        with self.assertRaises(Token.DoesNotExist):
            Token.objects.get(user=self.user)


    def test_logout_without_token(self):
        """Test logout without authentication (should fail)"""
        self.client.credentials()  # no auth header
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN) 

