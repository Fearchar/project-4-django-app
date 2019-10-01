# Mana Curve

## Overview

Mana Curve is an online deck builder for the strategic card game Magic: The Gathering (MTG). The site enables users to use cards drawn from the MTG API to create decks for them to play, and compare their win rates to see which decks perform best.

## The Project Brief

For this one week project we were asked to build a full stack website using React and a fully RESTful API created with Django.


## Technologies Used
* JavaScript
* React
* Python
* Django
* Django REST Framework
* PostgreSQL
* SCSS
* Bulma

## Approaches & Features

Below I’ve picked out some of the key approaches and features used in this project, to give a sense of how the finished site was made.

### Frontend

#### Deck Pages

The site has three main pages, the home, top decks and deck page, and pages for login and registration. The most developed of these pages is the deck page which allows the user to view, create and edit decks, changing its functionality and layout depending on whether the user logged in, and whether they created the deck.

If the user is viewing a deck which they did not create, the page is taken up by the cards of the deck. The user can then navigate through the deck using the pagination bar or filtering using based on card details, such as the type or colour of the card (two features which are important to game play.)

If the player is creating a new deck, or editing an existing one, a panel is visible on the right side of the page and all the available cards can be navigated using the filters and pagination bar. Cards can be added to the deck deck panel by clicking them on the main section of the page and removed by clicking on them in the deck panel. They can also be saved or deleted here.

### Backend

#### Models

My API used three models for Cards, Decks and Games. The finished project does not use the Game model, as the features which it was envisioned for it were not completed within the one week scope of the project. If I work further on this project, building out the functionality around Games will be once of the first additional features (more on this can be found in the Additional Features section below).

The API also uses Django’s built in User model in combination with a separate Django app for authentication, and a number of many to many relationships are created between the Cards model and Decks to add additional information to User records.

Card and Deck Modals
```python
class Card(models.Model):
    name = models.CharField(max_length=50)
    manaCost = models.CharField(blank=True, max_length=50)
    cmc = models.FloatField()
    type = models.CharField(max_length=100)
    rarity = models.CharField(max_length=20)
    set = models.CharField(max_length=50)
    text = models.CharField(blank=True, max_length=800)
    imageUrl = models.CharField(blank=True, max_length=300)
    users = models.ManyToManyField(User, related_name='collection')

    def __str__(self):
        return f'{self.name}: {self.type} - {self.rarity} ({self.set})'

class Deck(models.Model):
    name = models.CharField(max_length=50)
    cards = models.ManyToManyField(Card, related_name='decks')
    imageUrl = models.CharField(blank=True, max_length=300)
    win_rate = models.FloatField(blank=True, null=True)
    created_by = models.ForeignKey(User, null=True, related_name='decks_created', on_delete=models.SET_NULL)
    users = models.ManyToManyField(User, related_name='decks_played')

    def __str__(self):
        return f'{self.name} ({self.created_by})'
```
#### Fetching and Saving Cards From the MTG API

MTG is a card game has existed for over two decades, during which period tens of thousands of cards have been printed. I decided to restrict my site to the cards available in MTG Arena, an online version of the game which is restricted to particular releases (or sets) from the last two years.

In order to get the images and details from the cards that I needed for my site, I used the MTG open API. The API has good documentation and is easy to use but, due to its popularity, it can take as much as half a minute to make a request for a single page of data (100 cards). I didn’t want this response time to slow down my site, so I created a Django command which can be called from the terminal to download the data from the relevant sets to my database.

The MTG API sends back to users about how many pages there are of cards in any set through a Link header. The command sends an initial request to the API, fetching the first page and retrieving the total number of pages from the Link header using regex and looped through the pages making subsequent requests, organising the card data that I needed into the form I needed and then saving it to my database.
