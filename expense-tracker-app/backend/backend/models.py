from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  # hashed passwords
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class Expenses(models.Model):
    exp_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=70)
    amount = models.DecimalField(max_digits=12, decimal_places=2) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    STATUSES = {
        "PG":"Pending",
        "PD":"Paid"
    }
    status = models.CharField(max_length=1,choices =STATUSES)
    payment_date = models.DateField()
    exp_cat_id =models.ForeignKey(Expense_Category, on_delete=models.RESTRICT)

    def __str__(self):
        return  f"{self.user_id.name} - {self.description} - ${self.amount}"
    
class Expense_Category(models.Model):
    exp_cat_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



class Income(models.Model):
    income_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=70)
    amount = models.DecimalField(max_digits=12, decimal_places=2) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    STATUSES = {
        "PG":"Pending",
        "RD":"Recieved"
    }
    status = models.CharField(max_length=1,choices =STATUSES)
    recieving_date = models.DateField()
    income_cat_id =models.ForeignKey(Income_Category, on_delete=models.RESTRICT)

    def __str__(self):
        return  f"{self.user_id.name} - {self.description} - ${self.amount}"


class Income_Category(models.Model):
    income_cat_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Budget(models.Model):
    budget_id = models.AutoField(primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    user_id =  models.ForeignKey(User, on_delete=models.CASCADE)
    alloted_amount = models.DecimalField(max_digits=12, decimal_places=2) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return  f"{self.user_id.name} - {self.start_date} - {self.end_date} - ${self.alloted_amount}"
