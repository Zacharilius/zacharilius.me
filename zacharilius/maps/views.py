from django.shortcuts import render

def maps(request):
    return render(request, "maps/maps.html", {
    	'active_tab': 'maps'
    })
