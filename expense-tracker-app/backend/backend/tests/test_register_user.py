from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

class UserRegistrationTestCase(APITestCase):

    def setUp(self):
        """Set up initial data"""
        self.register_url = "/register/"
        self.user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123"
        }

    def test_register_user_success(self):
        """Test if a user can register successfully"""
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        res_keys = ["user_id","email","username"]
        for key in res_keys: self.assertIn(key, response.data)
    

    def test_register_user_with_existing_username(self):
        """Test for user registration with a duplicate username should fail"""
        User.objects.create_user(username="testuser", email="old@example.com", password="somepassword")
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)  # any error message for username

    def test_register_user_with_missing_password(self):
        """Test if user registration should fail if required field is missing"""
        incomplete_data = {"username": "newuser"}
        response = self.client.post(self.register_url, incomplete_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)
   