from flask import Blueprint, jsonify, request, current_app
from app.models import Drink, Order, Topping, User, db, order_toppings
from flask_login import login_required, current_user
from datetime import datetime
from datetime import timedelta

orders_routes = Blueprint('orders', __name__)

def get_order_details(order):
    order_details = order.to_dict()
    order_details["order_drink"] = order.order_drink.to_dict()
    if order.order_review:
        order_details["order_review"] = order.order_review.to_dict()
    toppings = []
    for topping in order.toppings:
        toppings.append(topping.to_dict())
    order_details["toppings"] = toppings
    return order_details

# GET Orders Based on User Id (Order History)
@orders_routes.route('user/<int:userId>', methods=['GET'])
@login_required
def get_order_history(userId):
    if current_user.id != userId:
        return {'errors': ["Unauthorized user"]}, 403
    orders = Order.query.filter(Order.userId == userId).all()
    orders_details = [get_order_details(order) for order in orders]
    return jsonify(orders_details)


# Helper Funtion for Create and Editing Orders
def validate_order_data(data):
    if not data:
        return {'error': 'Invalid request data'}, 400
    drinkId = data.get("drinkId", -1)
    drink = Drink.query.get(drinkId)
    if drink is None:
        return {'errors': [f"Drink with id {drinkId} couldn't be found"]}, 404

    errors = []
    toppingIds = data.get("toppingIds", [])
    for toppingId in toppingIds:
        topping = Topping.query.get(toppingId)
        if topping is None:
            errors.append(f"Topping with id {toppingId} couldn't be found")
    if errors:
        return {'errors': errors}, 404
    return {}, None


# CREATE a New Order
@orders_routes.route('/', methods=['POST'])
@login_required
def create_order():
    data = request.json

    errors, status = validate_order_data(data)
    if errors:
        return jsonify(errors), status

    order = Order(
        userId = current_user.id,
        drinkId = data["drinkId"]
    )
    db.session.add(order)
    db.session.commit()

    toppingIds = data.get("toppingIds", [])
    for toppingId in toppingIds:
        order_topping = order_toppings.insert().values(
            toppingId=toppingId,
            orderId=order.id
        )
        db.session.execute(order_topping)
    db.session.commit()

    return jsonify(get_order_details(order)), 201


# EDIT a Drink in Order (1 Minute Timeout)
@orders_routes.route('/<int:orderId>', methods=['PUT'])
@login_required
def change_order_status(orderId):
    data = request.json
    errors, status = validate_order_data(data)
    if errors:
        return jsonify(errors), status

    order = Order.query.get(orderId)
    if order:
        # Check that order is less than 1 minute old
        if (order.createdAt + timedelta(minutes=1) >= datetime.utcnow()):
            # Update order attributes etc.
            order.drinkId = data.get('drinkId', order.drinkId)
            # Delete previous order toppings
            order_topping_deletions = order_toppings.delete().where(order_toppings.c.orderId == order.id)
            db.session.execute(order_topping_deletions)
            # Insert updated order toppings
            toppingIds = data.get("toppingIds", [])
            for toppingId in toppingIds:
                order_topping = order_toppings.insert().values(
                    toppingId=toppingId,
                    orderId=order.id
                )
                db.session.execute(order_topping)
            db.session.commit()
            return jsonify(get_order_details(order)), 201
        else:
            return {'errors': ['Order cannot be modified after 1 minute']}, 403
    else:
        return {'errors': ['Order not found']}, 404


# DELETE an Order (1 Minute Timeout)
@orders_routes.route('/<int:orderId>', methods=['DELETE'])
@login_required
def cancel_order(orderId):
    order = Order.query.get(orderId)
    if order:
        if (order.createdAt + timedelta(minutes=1) >= datetime.utcnow()):
            db.session.delete(order)
            db.session.commit()
            return jsonify({'message': 'Order successfully cancelled'}), 200
        else:
            return {'errors': ['Order cannot be cancelled after 1 minute']}, 403
    else:
        return {'errors': ['Order not found']}, 404
