from app.models import db, Drink, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

def seed_drinks():
    drinks_data = [
            {'name': "House Black Milk Tea", 'details': "Our classic house blend", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Matcha Milk Tea", 'details': "Earthy and subtle flavors", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Jasmine Milk Tea", 'details': "Special floral blend", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Black Sesame Milk Tea", 'details': "Savory and sweet", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Ginger Lemon Tea", 'details': "Perfect hot for winters", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Passionfruit Tea", 'details': "Summery drink", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Strawberry Matcha Milk Tea", 'details': "Everyone's favorite", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Taro Milk Tea", 'details': "With real taro chunks", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Brown Sugar Black Milk Tea", 'details': "Our classic house blend with house made brown sugar syrup", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt':  datetime.date(2020,10,20)},
            {'name': "Thai Iced Tea", 'details': "Deliciously steeped", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Mango Green Tea", 'details': "Fresh mango chunks", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Peach Green Tea", 'details': "Fresh peach chunks", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)}
    ]
    for drink_data in drinks_data:
        drink = Drink(**drink_data)
        db.session.add(drink)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_drinks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM drinks"))

    db.session.commit()
