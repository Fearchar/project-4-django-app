# Generated by Django 2.2.5 on 2019-09-06 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mtg_decks', '0017_merge_20190906_1010'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='manaCost',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='card',
            name='text',
            field=models.CharField(blank=True, max_length=800),
        ),
    ]
