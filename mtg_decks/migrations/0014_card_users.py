# Generated by Django 2.2.5 on 2019-09-05 20:29

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mtg_decks', '0013_auto_20190905_2019'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='users',
            field=models.ManyToManyField(related_name='collection', to=settings.AUTH_USER_MODEL),
        ),
    ]
