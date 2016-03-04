from django.shortcuts import render

def index(request):
	#return HttpResponse("Http response")
    return render(request, "portfolio/index.html", {
    	'active_tab': 'home'
    })
