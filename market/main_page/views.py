from django.shortcuts import render , redirect
from django.contrib import auth
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.edit import FormView
from django.contrib.auth import authenticate, login
from .models import *
from django.contrib.auth.models import User
from .forms import *
from django.http import JsonResponse

def main(request):
    args = {}
    user = auth.get_user(request)
    args['user'] = user
    args['form'] = Avatar_form()

    return render(request, 'main_page.html', args)

