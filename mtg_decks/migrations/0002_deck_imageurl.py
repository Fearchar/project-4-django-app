# Generated by Django 2.2.5 on 2019-09-10 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mtg_decks', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='deck',
            name='imageUrl',
            field=models.CharField(blank=True, max_length=300),
        ),
    ]
