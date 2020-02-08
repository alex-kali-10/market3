from django import forms
from main_page.models import *
from django.contrib.auth.models import User

class Avatar_form(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('avatar',)

