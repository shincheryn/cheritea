from flask import Blueprint, jsonify, request, current_app
from app.models import Order, User, db
from app.forms import OrderForm
from flask_login import login_required, current_user

orders_routes = Blueprint('orders', __name__)

# GET Orders Based on User Id (Order History)
@orders_routes.route('/<int:userId>')
@login_required
def get_order_history(userId):
    # Query the database to fetch order history for the current user
    orders = Order.query.filter(Order.userId == current_user.id).all()
    return jsonify([order.to_dict() for order in orders])


# CREATE an Order (New)
@orders_routes.route('/', methods=['POST'])
@login_required
def create_order():
    data = request.json
    if not data:
        return jsonify({'error': 'Invalid request data'}), 400

    order = Order(**data)

    db.session.add(order)
    db.session.commit()

    return jsonify(drink.to_dict()), 201
    return {'errors': ['Your order was unsuccessful']}, 400


# EDIT an Order (Before Submitting)
@orders_routes.route('/<int:orderId>', methods=['PUT'])
@login_required
def edit_order(orderId):
    form = OrderForm()
    if form.validate_on_submit():
        # Query the database to find the order to be edited
        order = Order.query.get(orderId)
        if order:
            # Update order attributes etc.
            db.session.commit()
            return order.to_dict()
        else:
            return {'errors': ['Order not found']}, 404
    return {'errors': ['There was an error editing your order']}, 400


# DELETE an Order (Before Submitting)
@orders_routes.route('/<int:orderId>', methods=['DELETE'])
@login_required
def delete_order(orderId):
    # Query the database to find the order to be deleted
    order = Order.query.get(orderId)
    if order:
        db.session.delete(order)
        db.session.commit()
        return {'message': 'Order deleted successfully'}
    else:
        return {'errors': ['There was an error deleting your order']}, 404
