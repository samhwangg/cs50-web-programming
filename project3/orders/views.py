from django.http import HttpResponse
from django.shortcuts import render

from .models import specialtyPizza, appetizers

# Create your views here.
def index(request):
	context = {}
	return render(request, "orders/index.html", context)

def menu(request):
	context = {
		"appetizers" : appetizers.objects.all(),
		"specialtyPizza" : specialtyPizza.objects.all()
	}
	return render(request, "orders/menu.html", context)

def beer(request):
	context = {}
	return render(request, "orders/beer.html", context)

def order(request):
	context = {}
	return render(request, "orders/order.html", context)
