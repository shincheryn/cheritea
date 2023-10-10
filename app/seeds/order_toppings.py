from app.models import db, order_toppings, environment, SCHEMA
from sqlalchemy.sql import text

def seed_order_toppings():
    ot1 = order_toppings.insert().values(
        orderId= 1, toppingId=1
    )
    ot2 = order_toppings.insert().values(
        orderId= 1, toppingId=2
    )
    ot3 = order_toppings.insert().values(
        orderId= 1, toppingId=3
    )
    ot4 = order_toppings.insert().values(
        orderId= 2, toppingId=4
    )
    ot5 = order_toppings.insert().values(
        orderId= 2, toppingId=5
    )
    ot6 = order_toppings.insert().values(
        orderId= 2, toppingId=6
    )
    ot7 = order_toppings.insert().values(
        orderId= 3, toppingId=7
    )
    ot8 = order_toppings.insert().values(
        orderId= 3, toppingId=8
    )
    ot9 = order_toppings.insert().values(
        orderId= 3, toppingId=9
    )
    db.session.execute(ot1)
    db.session.execute(ot2)
    db.session.execute(ot3)
    db.session.execute(ot4)
    db.session.execute(ot5)
    db.session.execute(ot6)
    db.session.execute(ot7)
    db.session.execute(ot8)
    db.session.execute(ot9)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_order_toppings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_toppings"))

    db.session.commit()
