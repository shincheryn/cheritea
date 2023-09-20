from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# Join Table
order_toppings = db.Table(
    "order_toppings",
    db.Column("orderId", db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), primary_key=True),
    db.Column("toppingId", db.Integer, db.ForeignKey(add_prefix_for_prod("toppings.id")), primary_key=True)
)

# User Model
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    isAdmin = db.Column(db.Boolean, default=False, nullable=False)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

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
    # One to many with Review.userId
    user_reviews = db.relationship("Review", back_populates="user")
    # One to many with Order.userId
    user_orders = db.relationship("Order", back_populates="user")


# Order Model
class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)  # Foreign key to Users Table
    drinkId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('drinks.id')), nullable=False) # Foreign key to Drinks Table
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
    # One to many with OrderTopping.orderId
    order_toppings = db.relationship(
        "Topping",
        secondary=order_toppings,
        primaryjoin=(id == order_toppings.c.orderId),
        secondaryjoin=(id == order_toppings.c.toppingId),
        back_populates="topping_orders"
    )
    # Many to one with User.id
    user = db.relationship("User", back_populates="user_orders")
    # One to one with Review.orderId
    order_review = db.relationship("Review", back_populates="order")
    # Many to one with Drink.id
    order_drinks = db.relationship("Drink", back_populates="drink_orders")


# Review Model
class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)  # Foreign key to Users Table
    orderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), nullable=False, unique=True)  # Foreign key to Orders Table
    review = db.Column(db.String(255), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
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

    user = db.relationship("User", back_populates="user_reviews")
    order = db.relationship("Order", back_populates="order_review")


# Topping Model
class Topping(db.Model):
    __tablename__ = 'toppings'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True,)
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
    topping_orders = db.relationship(
        "Order",
        secondary=order_toppings,
        primaryjoin=(id == order_toppings.c.toppingId),
        secondaryjoin=(id == order_toppings.c.orderId),
        back_populates="order_toppings"
    )


# Drink Model
class Drink(db.Model):
    __tablename__ = 'drinks'

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
    # One to many with Order.drinkId
    drink_orders = db.relationship("Order", back_populates="order_drinks")
