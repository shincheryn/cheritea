from app.models import db, Topping, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

def seed_toppings():
    toppings_data = [
            {'name': "Honey Boba", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Grass Jelly", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Coconut Jelly", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Aloe", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Lychee Jelly", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Mango Popping Boba", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Strawberry Popping Boba", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Taro Chunks", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Brown Sugar Syrup", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Mochi Balls", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Ube Mochi Pearls", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Sago", 'details':"Yummy", 'imageUrl': "https://cdn4.iconfinder.com/data/icons/drinks-beverage-5/1000/Bubble_matcha-512.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)}
    ]
    for topping_data in toppings_data:
        topping = Topping(**topping_data)
        db.session.add(topping)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_toppings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM toppings"))

    db.session.commit()
