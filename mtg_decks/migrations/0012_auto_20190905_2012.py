# Generated by Django 2.2.5 on 2019-09-05 20:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mtg_decks', '0011_auto_20190905_2000'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deck',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='decks_created', to='mtg_decks.Player'),
        ),
        migrations.AlterField(
            model_name='deck',
            name='users',
            field=models.ManyToManyField(related_name='decks_played', to='mtg_decks.Player'),
        ),
        migrations.AlterField(
            model_name='game',
            name='created_by',
            field=models.ManyToManyField(related_name='games_created', to='mtg_decks.Player'),
        ),
        migrations.AlterField(
            model_name='game',
            name='players',
            field=models.ManyToManyField(related_name='games_played', to='mtg_decks.Player'),
        ),
    ]