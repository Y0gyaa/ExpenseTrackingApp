from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token

User = get_user_model()

class DeleteUserTestCase(APITestCase):
    def setUp(self):
        """Create a test user and authenticate before each test"""
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="testpassword123"
        )
        self.token = Token.objects.create(user=self.user)  # create token
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)  # auth header
        self.delete_url = "/delete-user/1/"  # assuming user id on first creation is 1


    def test_delete_user_success(self):
        """Test successful user deletion"""
        response = self.client.delete(self.delete_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        user_exists = User.objects.filter(username="testuser").exists()
        self.assertFalse(user_exists)


    def test_delete_user_without_authentication(self):
        """Test deleting user without auth header (should fail)."""
        self.client.credentials() 
        response = self.client.delete(self.delete_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN) 


    def test_delete_user_twice(self):
        """Test deleting an already deleted user (should fail)."""        
        response = self.client.delete(self.delete_url)  
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)  # user of same id not found
