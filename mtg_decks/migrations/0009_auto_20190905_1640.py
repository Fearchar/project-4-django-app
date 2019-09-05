# Generated by Django 2.2.5 on 2019-09-05 16:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mtg_decks', '0008_deck_game_player'),
    ]

    operations = [
        migrations.AddField(
            model_name='deck',
            name='cards',
            field=models.ManyToManyField(related_name='decks', to='mtg_decks.Card'),
        ),
        migrations.AddField(
            model_name='deck',
            name='users',
            field=models.ManyToManyField(related_name='decks_played', to='mtg_decks.Player'),
        ),
        migrations.AddField(
            model_name='game',
            name='created_by',
            field=models.ManyToManyField(related_name='games_created', to='mtg_decks.Player'),
        ),
        migrations.AddField(
            model_name='game',
            name='decks',
            field=models.ManyToManyField(related_name='games', to='mtg_decks.Deck'),
        ),
        migrations.AddField(
            model_name='game',
            name='players',
            field=models.ManyToManyField(related_name='games_played', to='mtg_decks.Player'),
        ),
        migrations.AlterField(
            model_name='deck',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='decks_created', to='mtg_decks.Player'),
        ),
    ]
