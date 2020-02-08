from django.contrib import admin
from .models import *

class inf(admin.ModelAdmin):
    pass

admin.site.register(Item, inf)

class inf(admin.ModelAdmin):
    pass

admin.site.register(Profile, inf)
