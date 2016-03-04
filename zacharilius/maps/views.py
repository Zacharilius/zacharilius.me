from django.shortcuts import render

def maps(request):
	#return HttpResponse("Http response")
    return render(request, "maps/maps.html", {
    	'active_tab': 'maps'
    })
