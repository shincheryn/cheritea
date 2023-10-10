from app.models import db, Topping, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

def seed_toppings():
    toppings_data = [
            {'name': "Honey Boba", 'details':"Chewy tapioca pearls in brown sugar honey syrup", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696784209/honey-boba.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Grass Jelly", 'details':"Herb jelly topping originating from China - has a herbal, minty flavor and works well with our creamier drinks", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696784293/grass-jelly.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Raspberry Popping Boba", 'details':"Chewy and made with real raspberry syrup", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696784219/raspberry-popping-boba.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Coffee Jelly", 'details':"Tastes like sweet instant coffee", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696784243/coffee-jelly.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Colorful Mochi", 'details':"Regular chewy mochi, we make it colorful! Softer when served hot", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696784256/colorful-mochi.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Egg Custard", 'details':"Tastes like egg tart custard, goes best with our more subtle flavored drinks", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696784284/egg-custard.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Whipped Cheese Foam", 'details':"Slighty salty, very creamy and fluffy", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696784270/whipped-cheese-foam.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Sago", 'details':"Mini tapioca pearls, works best with mango drinks or coconut drinks", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696784313/sago.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Black Sesame & Sweet Potato Mochi", 'details':"Flavorful mochi, with nutty roasted black sesame and yammy sweet potato", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696784348/black-sesame-sweet-potato-mochi.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
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
