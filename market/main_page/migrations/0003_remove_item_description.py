# Generated by Django 2.2.2 on 2019-12-27 00:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_page', '0002_auto_20191227_0202'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='description',
        ),
    ]