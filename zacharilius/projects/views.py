from django.shortcuts import render

def projects(request):
    return render(request, "projects/projects.html", {
    	'active_tab': 'projects'
    })
