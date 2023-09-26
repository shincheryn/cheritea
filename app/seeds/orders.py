from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_orders():
    orders_data = [
            {'userId': 1, 'drinkId': 1, 'createdAt': datetime(2020,10,20), 'updatedAt': datetime(2020,10,20)},
            {'userId': 1, 'drinkId': 2, 'createdAt': datetime(2020,10,20), 'updatedAt': datetime(2020,10,20)},
            {'userId': 1, 'drinkId': 3, 'createdAt': datetime(2020,10,20), 'updatedAt': datetime(2020,10,20)},
            {'userId': 2, 'drinkId': 4, 'createdAt': datetime(2020,10,20), 'updatedAt': datetime(2020,10,20)},
            {'userId': 2, 'drinkId': 5, 'createdAt': datetime(2020,10,20), 'updatedAt': datetime(2020,10,20)},
            {'userId': 2, 'drinkId': 6, 'createdAt': datetime(2020,10,20), 'updatedAt': datetime(2020,10,20)},
            {'userId': 3, 'drinkId': 7, 'createdAt': datetime(2020,10,20), 'updatedAt': datetime(2020,10,20)},
            {'userId': 3, 'drinkId': 8, 'createdAt': datetime(2020,10,20), 'updatedAt': datetime(2020,10,20)},
            {'userId': 3, 'drinkId': 9, 'createdAt': datetime(2020,10,20), 'updatedAt': datetime(2020,10,20)}
        ]
    for order_data in orders_data:
        order = Order(**order_data)
        db.session.add(order)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
