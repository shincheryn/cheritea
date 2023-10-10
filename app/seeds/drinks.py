from app.models import db, Drink, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

def seed_drinks():
    drinks_data = [
            {'name': "House Black Milk Tea", 'details': "Our most popular item - classic flavor steeped in a special black tea blend steeped for over 12 hours", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696782576/house-black-milk-tea.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Matcha Milk Tea", 'details': "Earthy and subtle flavors. Made with real matcha powder hand ground from green tea leaves", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696782546/matcha-milk-tea.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Jasmine Milk Tea", 'details': "Fragrant and soft floral blend with a slight sweetness to it", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696782185/jasmine-milk-tea.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Hojicha Milk Tea", 'details': "Roasted green tea leaves mixed with other spices to bring out a nutty aroma", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696782209/hojicha-milk-tea.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Ginger Lemon Tea", 'details': "Spicy and sweet, perfect for a sore throat or to warm up on a cold day - we recommend served hot", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696783362/ginger-lemon-tea.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Mango Passionfruit Tea", 'details': "Summery drink that is sweet and tangy", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696782370/mango-passionfruit-tea.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Taro Milk Tea", 'details': "A classic flavor that we serve using all natural flavors and real taro chunks", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696783115/taro-milk-tea.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Brown Sugar Black Milk Tea", 'details': "Made with our house made brown sugar syrup to satisfy your sweet tooth cravings", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696783062/brown-sugar-black-milk-tea.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt':  datetime.date(2020,10,20)},
            {'name': "Thai Iced Tea", 'details': "Naturally vibrant colors with a creamy texture", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696783006/thai-iced-tea.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Strawberry Ube Frozen Milk Tea", 'details': "Unique mix of sweet strawberry puree and earthy ube, served in a frozen milk tea blend", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696783112/strawberry-ube-slushie.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Strawberry Matcha Frozen Milk Tea", 'details': "Fresh and sweet strawberry puree mixed with real matcha powder, served in a frozen milk tea blend", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696783300/strawberry-matcha-frozen-milk-tea.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)},
            {'name': "Mango Peach Frozen Milk Tea", 'details': "Delicious and refreshing blend of mango puree and ripe peach chunks, served in a frozen milk tea blend", 'imageUrl': "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696782297/mango-peach-frozen-milk-tea.png", 'inStock': True, 'createdAt': datetime.date(2020,10,20), 'updatedAt': datetime.date(2020,10,20)}
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
