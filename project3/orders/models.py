from django.db import models

# Create your models here.
class appetizers(models.Model):
	name = models.CharField(max_length=50, primary_key=True)
	description = models.TextField(blank=True, null=True)

	def __str__(self):
		if self.description:
			return f"{self.name} - {self.description}"
		else:
			return f"{self.name}"

class specialtyPizza(models.Model):
	name = models.CharField(max_length=50, primary_key=True)
	description = models.TextField()

	def __str__(self):
		return f"{self.name} - {self.description}"