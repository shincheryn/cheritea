from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    reviews_data = [
            {'userId'=1, 'orderId'= 1, 'review'= "Delicious", 'stars'=5 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'userId'=1, 'orderId'= 2, 'review'= "Delicious", 'stars'=4 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'userId'=1, 'orderId'= 3, 'review'= "Delicious", 'stars'=5 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'userId'=2, 'orderId'= 4, 'review'= "Delicious", 'stars'=5 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'userId'=2, 'orderId'= 5, 'review'= "Delicious", 'stars'=4 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'userId'=2, 'orderId'= 6, 'review'= "Delicious", 'stars'=3 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'userId'=3, 'orderId'= 7, 'review'= "Delicious", 'stars'=4 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'userId'=3, 'orderId'= 8, 'review'= "Delicious", 'stars'=5 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
            {'userId'=3, 'orderId'= 9, 'review'= "Delicious", 'stars'=5 'createdAt'= datetime(2020,10,20), 'updatedAt'= datetime(2020,10,20)},
    ]
    for reviews in toppings_data:
        db.session.add(**reviews)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
