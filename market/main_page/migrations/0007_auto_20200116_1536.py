# Generated by Django 2.2.2 on 2020-01-16 12:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main_page', '0006_rating_review'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_page.Item'),
        ),
        migrations.AlterField(
            model_name='review',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_page.Item'),
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.ImageField(default='img_user/standart.png', upload_to='img_user', verbose_name='Изображение')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
