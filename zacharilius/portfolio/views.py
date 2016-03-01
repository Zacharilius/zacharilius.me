from django.shortcuts import render

def index(request):
     render(request, "portfolio/index.html", {})
