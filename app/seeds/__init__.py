from flask.cli import AppGroup
from .users import seed_users, undo_users
from .drinks import seed_drinks, undo_drinks
from .orders import seed_orders, undo_orders
from .reviews import seed_reviews, undo_reviews
from .order_toppings import seed_order_toppings, undo_order_toppings
from .toppings import seed_toppings, undo_toppings

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    # Add other seed functions here
    seed_drinks()
    seed_reviews()
    seed_order_toppings()
    seed_orders()
    seed_toppings()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_drinks()
    undo_reviews()
    undo_order_toppings()
    undo_orders()
    undo_toppings()
