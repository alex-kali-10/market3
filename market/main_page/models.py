from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import Avg

Alc_Choice = (
    ('vd', "vodka"),
    ('vn', "vino"),
    ('ko', "koniak"),
    ('vi', "viski"),
    ('ro', "rom"),
    ('tk', "tekila"),
)

Country_Choice = (
    ('arm', "Армения"),
    ('pol', "Польша"),
    ('rus', "Россия"),
    ('ua', "Украина"),
    ('bel', "Беларусь"),
    ('fin', "Финляндия"),
    ('franc', "Франция"),
    ('ger', "Германия"),
    ('icp', "Испания"),
)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='img_user', verbose_name='Изображение',default='img_user/standart.png')
    def __unicode__(self):
        return self.user

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Item(models.Model):
    class Meta():
        db_table = 'alkogole'
    avatar = models.ImageField(upload_to='img',verbose_name='аватарка',default='img/standart.png', blank=False, null=True)
    name = models.CharField(verbose_name='имя',max_length=100,default='')
    categoria = models.CharField(verbose_name='категория',max_length=9,choices=Alc_Choice)
    country = models.CharField(verbose_name='страна',max_length=9, choices=Country_Choice)
    ppm = models.IntegerField(verbose_name='градусы')
    volume = models.FloatField(verbose_name='обьем')
    price = models.IntegerField(verbose_name='цена')
    def avg_rate(self):
        avg = Rating.objects.filter(item = self).aggregate(Avg('rating'))
        if avg['rating__avg'] == None:
            return 'Пустовато'
        else:
            return avg['rating__avg']


class Review(models.Model):
    class Meta():
        db_table = 'Отзыв'
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)

class Rating(models.Model):
    class Meta():
        db_table = 'Рейтинг'
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    rating = models.IntegerField(default=1,validators=[MaxValueValidator(101),MinValueValidator(0)])