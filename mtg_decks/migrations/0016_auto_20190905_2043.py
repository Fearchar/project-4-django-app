# Generated by Django 2.2.5 on 2019-09-05 20:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mtg_decks', '0015_auto_20190905_2038'),
    ]

    operations = [
        migrations.RenameField(
            model_name='game',
            old_name='users',
            new_name='users',
        ),
    ]
