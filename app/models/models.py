from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# Join Tables
order_topping = db.Table("order_toppings",
                       db.Column("orderId", db.Integer, db.ForeignKey(add_prefix_for_prod('order.id')), primary_key=True),
                       db.Column("toppingId", db.Integer, db.ForeignKey(add_prefix_for_prod('topping.id')), primary_key=True)
                       )
if environment == "production":
    order_topping.schema = SCHEMA


# Users Model.. Need to check if isAdmin boolean works
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    isAdmin = db.Column(db.Boolean, default=False, nullable=False)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)


    # I think I need this but need to look up db more
    # def __init__(self, username, email, isAdmin=False):
    #     self.username = username
    #     self.email = email
    #     self.isAdmin = isAdmin

    # def __repr__(self):
    #     return '<User %r>' % self.username

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'isAdmin': self.isAdmin,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'username': self.username,
            'email': self.email
        }

    # Relationships
    # User.id has one to many relationships with:
    # 1. Review.userId
    user_review = db.relationship("Review", back_populates="reviews")
    # 2. Order.userId
    user_order = db.relationship("Order", back_populates="orders")


# Order Model
class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, db.ForeignKey(add_prefix_for_prod('order.id')))
    userId = db.Column(db.Integer, nullable=False)
    drinkId = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'drinkId': self.drinkId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }

    # Relationships
    # Order.id has a one to many relationship with OrderTopping.orderId
    order_orderTopping = db.relationship("OrderTopping",
                            secondary=order_topping,
                            back_populates="order_toppings")
    # Order.userId has a many to one relationship with User.id
    order_user = db.relationship("User", back_populates="users")


# Review Model
class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, unique=True, primary_key=True, autoincrement=True)
    userId = db.Column(db.Integer, nullable=False)
    orderId = db.Column(db.Integer, unique=True, nullable=False)
    review = db.Column(db.String(255), nullable=False)
    stars = db.Column(db.Integer(1,5), nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'orderId': self.orderId,
            'review': self.review,
            'stars': self.stars,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }

    # Relationships
    # Review.userId has a many to one relationship with User.id
    review_userId = db.relationship("User", back_populates="users")
    # Review.orderId has a one to one relationship with Order.id
    review_orderId = db.relationship("Order", back_populates="orders")


# Topping Model
class Topping(db.Model):
    __tablename__ = 'toppings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, db.ForeignKey(add_prefix_for_prod('topping.id')))
    name = db.Column(db.String(255), unique=True, nullable=False)
    details = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)
    inStock = db.Column(db.Boolean, default=False, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'details': self.details,
            'imageUrl': self.imageUrl,
            'inStock': self.inStock,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }

    # Relationships
    # Topping.id has a one to many relationship with OrderToppping.toppingId
    topping_orderTopping = db.relationship("OrderTopping",
                            secondary=order_topping,
                            back_populates="order_toppings")


# Drink Model
class Drink(db.Model):
    __tablename__ = 'drinks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    details = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)
    inStock = db.Column(db.Boolean, default=False, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'details': self.details,
            'imageUrl': self.imageUrl,
            'inStock': self.inStock,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }

    # Relationships
    # Drink.id has a one to many relationship with Order.drinkId
    drink_id = db.relationship("Order", back_populates="orders")
