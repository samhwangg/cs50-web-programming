from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("menu", views.menu, name="menu"),
    path("beer", views.beer, name="beer"),
    path("order", views.order, name="order")
]
