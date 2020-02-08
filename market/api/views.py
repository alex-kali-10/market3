from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from main_page.models import *
from django.contrib import auth
from datetime import datetime
from django.core import serializers
from django.contrib.auth.models import User

from django.contrib.auth.forms import UserCreationForm
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.renderers import StaticHTMLRenderer
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from .serializer import *
from .forms import *
from rest_framework import views

@api_view(['POST', 'PUT', 'DELETE'])
def all_items(request, format=None):
    print('tyt')
    print(request)
    print(request.user)
    print(request.auth)
    choice_item = {2: 'vn', 3: 'vd', 4: 'ko', 5: 'vi', 6: 'ro', 7: 'tk'}
    Country_Choice = {'arm': "Армения",'pol': "Польша",'rus': "Россия",'ua':"Украина",'bel': "Беларусь",'fin': "Финляндия",'franc':"Франция",'ger': "Германия",'icp': "Испания",}
    #user = auth.get_user(request)
    args = {}
    if request.method == 'POST':
        menuActive = request.data.dict()['menuActive']
        item_list = Item.objects.filter(categoria=choice_item[int(menuActive)])
        args["newData"] = []
        for item in item_list:
            args["newData"].append({'id':item.id,'avatarUrl':item.avatar.url,'name':item.name,'country':Country_Choice[item.country],'ppm':item.ppm,'volume':item.volume,'price':item.price})
        return Response(args, status=status.HTTP_200_OK)

@api_view(['POST', 'PUT', 'DELETE'])
def best_item(request, format=None):
    Country_Choice = {'arm': "Армения",'pol': "Польша",'rus': "Россия",'ua':"Украина",'bel': "Беларусь",'fin': "Финляндия",'franc':"Франция",'ger': "Германия",'icp': "Испания",}
    args = {}
    if request.method == 'POST':
        item_list = Item.objects.filter()[:5]
        args["newData"] = []
        for item in item_list:
            args["newData"].append({'id':item.id,'avatarUrl':item.avatar.url,'name':item.name,'country':Country_Choice[item.country],'ppm':item.ppm,'volume':item.volume,'price':item.price})
        return Response(args, status=status.HTTP_200_OK)

@api_view(['POST', 'PUT', 'DELETE'])
def filter_items(request, format=None):
    choice_item = {2: 'vn', 3: 'vd', 4: 'ko', 5: 'vi', 6: 'ro', 7: 'tk'}
    Country_Choice = {'arm': "Армения",'pol': "Польша",'rus': "Россия",'ua':"Украина",'bel': "Беларусь",'fin': "Финляндия",'franc':"Франция",'ger': "Германия",'icp': "Испания",}
    #user = auth.get_user(request)
    args = {}
    if request.method == 'POST':
        menuActive = request.data.dict()['menuActive']
        minPrice = request.data.dict()['minPrice']
        maxPrice = request.data.dict()['maxPrice']
        maxVolume = request.data.dict()['maxVolume']
        minVolume = request.data.dict()['minVolume']
        maxPPM = request.data.dict()['maxPPM']
        minPPM = request.data.dict()['minPPM']
        country = request.data.dict()['country']
        item_list = Item.objects.filter(categoria=choice_item[int(menuActive)])
        item_list = item_list.filter(price__gte = minPrice,price__lte = maxPrice,volume__gte = minVolume,volume__lte = maxVolume,ppm__gte = minPPM,ppm__lte = maxPPM)
        if country != 'all':
            print(country)
            print(item_list)
            item_list = item_list.filter(country = country)
            print(item_list)
        args["newData"] = []
        for item in item_list:
            args["newData"].append({'id':item.id,'avatarUrl':item.avatar.url,'name':item.name,'country':Country_Choice[item.country],'ppm':item.ppm,'volume':item.volume,'price':item.price})
        if args["newData"] == []:
            args["newData"] = False
        return Response(args, status=status.HTTP_200_OK)

@api_view(['POST', 'PUT', 'DELETE'])
def inf_item(request, format=None):
    choice_item = {2: 'vn', 3: 'vd', 4: 'ko', 5: 'vi', 6: 'ro', 7: 'tk'}
    Country_Choice = {'arm': "Армения",'pol': "Польша",'rus': "Россия",'ua':"Украина",'bel': "Беларусь",'fin': "Финляндия",'franc':"Франция",'ger': "Германия",'icp': "Испания",}
    #user = auth.get_user(request)
    args = {}
    if request.method == 'POST':
        id_item = request.data.dict()['id']
        item = Item.objects.filter(id = int(id_item)).get()
        print(request.data.dict())
        args["item"] = {'id':item.id,'avatarUrl':item.avatar.url,'name':item.name,'country':Country_Choice[item.country],'ppm':item.ppm,'volume':item.volume,'price':item.price,'avg_rate':item.avg_rate()}
        args["item"]['rate'] = 'false'
        data = request.data.dict()
        user = auth.authenticate(username = data['username'],password = data['password'])
        if user is not None:
            try:
                 rate = Rating.objects.get(user = user , item__id = id_item)
                 args["item"]['rate'] = rate.rating
            except:
                pass
        comments = Review.objects.filter(item = id_item).order_by('-id')[:5]
        args["comments"] = {}
        for i in comments:
            args['comments'][i.id] = {'id': i.id , 'username': i.user.username,'avatarUrl': i.user.profile.avatar.url,'text': i.text}
        if args['comments'] == {}:
            args['comments'] = 'false'
        return Response(args, status=status.HTTP_200_OK)



@api_view(['POST'])
def registration(request, format=None):
    args = {}
    if request.method == 'POST':
        data = request.data.dict()
        print(data)
        form = UserCreationForm(data)
        if form.is_valid():
            print('все ок')
            form.save()
            args['errors'] = 'true'
        else:
            args['errors'] = form.errors.get_json_data(escape_html=False)
            print(args['errors'])
        return Response(args, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout(request, format=None):
    args = {}
    if request.method == 'POST':
        user = auth.get_user(request)
        request.session.flush()
        return Response(args, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request, format=None):
    args = {}
    if request.method == 'POST':
        data = request.data.dict()
        print(data)
        user = auth.authenticate(username = data['username'],password = data['password'])
        print(user)
        if user is not None:
            print('вы в системе')
            #auth.login(request,user)
            args['errors'] = 'false'
            args['avatarUrl'] = user.profile.avatar.url
        else:
            args['errors'] = 'true'
        return Response(args, status=status.HTTP_200_OK)


@api_view(['POST'])
@parser_classes([MultiPartParser,FileUploadParser])
def change_avatar(request, format=None):
    print('api')
    args = {}
    if request.method == 'POST':
        print('api2')
        print(request.data)
        data = request.data
        print(data)
        user = auth.authenticate(username = data['username'],password = data['password'])
        if user is not None:
            print('api3')
            print(user)
            print(request.FILES)
            form = Avatar_form(request.FILES, instance=user.profile)
            if form.is_valid():
                form.save(commit=False)
                form.user = user
                form.save()
                print('все ок')
                print(request.FILES)
                print(user.profile.avatar)
            else:
                print('не все ок')
                print(form.is_bound)
                print(form.errors)
        return Response(args, status=status.HTTP_200_OK)


@api_view(['POST'])
def rate(request, format=None):
    args = {}
    if request.method == 'POST':
        data = request.data.dict()
        print(data)
        user = auth.authenticate(username = data['username'],password = data['password'])
        if user is not None:
            try:
                item = Rating.objects.get(user = user,item__id = data['id'])
                item.rating = data['rate']
                item.save()
            except:
                Rating.objects.create(user = user,item_id = data['id'],rating = data['rate'])
            new_rate_avg = Item.objects.get(id = data['id'])
            args['new_avg'] = new_rate_avg.avg_rate()
            return Response(args, status=status.HTTP_200_OK)


@api_view(['POST'])
def new_comment(request, format=None):
    args = {}
    if request.method == 'POST':
        data = request.data.dict()
        print(data)
        user = auth.authenticate(username = data['username'],password = data['password'])
        if user is not None:
            item = Review.objects.create(user = user,item_id = data['id'],text = data['text'])
            comments = Review.objects.filter(id = item.id)
            args["comments"] = {}
            for i in comments:
                args['comments'][i.id] = {'id': i.id , 'username': i.user.username,'avatarUrl': i.user.profile.avatar.url,'text': i.text}
            print(args)
            return Response(args, status=status.HTTP_200_OK)


@api_view(['POST'])
def delete_comment(request, format=None):
    args = {}
    if request.method == 'POST':
        data = request.data.dict()
        user = auth.authenticate(username = data['username'],password = data['password'])
        if user is not None:
            Review.objects.filter(user = user, id = data['id']).get().delete()
            return Response(args, status=status.HTTP_200_OK)


@api_view(['POST'])
def old_comments(request, format=None):
    args = {}
    if request.method == 'POST':
        data = request.data.dict()
        print(data)
        comments = Review.objects.filter(item = data['id'], id__lt = data['lastComment']).order_by('-id')[:5]
        print(comments)
        args["comments"] = {}
        for i in comments:
            args['comments'][i.id] = {'id': i.id , 'username': i.user.username,'avatarUrl': i.user.profile.avatar.url,'text': i.text}
        return Response(args, status=status.HTTP_200_OK)



#class FileUploadView(views.APIView):
#    parser_classes = [FileUploadParser,MultiPartParser]
#    def post(self, request, filename, format=None):
#        user = auth.authenticate(username = 'user20',password = 'alex4mpro')
#        if user is not None:
#            form = Avatar_form(request.FILES)
#            if form.is_valid():
#                profile = Profile.objects.get(user = user)
#                profile.avatar = request.FILES['file']
#                profile.save()
#        return Response(status=204)

