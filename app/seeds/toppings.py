from app.models import db, Topping, environment, SCHEMA
from sqlalchemy.sql import text

def seed_toppings():
    toppings_data = [
            {'name'="Honey Boba", 'details'="Yummy", 'imageUrl'="imageUrl1", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'name'="Grass Jelly", 'details'="Yummy", 'imageUrl'="imageUrl2", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'name'="Coconut Jelly", 'details'="Yummy", 'imageUrl'="imageUrl3", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'name'="Aloe", 'details'="Yummy", 'imageUrl'="imageUrl4", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'name'="Lychee Jelly", 'details'="Yummy", 'imageUrl'="imageUrl5", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'name'="Mango Popping Boba", 'details'="Yummy", 'imageUrl'="imageUrl6", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'name'="Strawberry Popping Boba", 'details'="Yummy", 'imageUrl'="imageUrl7", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'name'="Taro Chunks", 'details'="Yummy", 'imageUrl'="imageUrl8", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'name'="Brown Sugar Syrup", 'details'="Yummy", 'imageUrl'="imageUrl9", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'name'="Mochi Balls", 'details'="Yummy", 'imageUrl'="imageUrl10", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'name'="Ube Mochi Pearls", 'details'="Yummy", 'imageUrl'="imageUrl11", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'name'="Sago", 'details'="Yummy", 'imageUrl'="imageUrl12", 'inStock'=True, 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)}
    ]
    for toppings in toppings_data:
        db.session.add(**toppings)
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
